"""
Migration: deactivate IDE tools (VS Code, Cursor, AI tools) in the skills table,
add Storybook, Vite, React Hook Form, and Zod.

Usage:
    cd vinicius-portfolio
    python scripts/migrate-skills.py
"""

import os
import sqlite3

BACKEND_DIR = os.path.join(
    os.path.dirname(os.path.abspath(__file__)),
    '..', 'backend',
)
DB_PATH = os.path.join(BACKEND_DIR, 'portfolio.db')


def run() -> None:
    conn = sqlite3.connect(DB_PATH)
    cur = conn.cursor()

    # 1. Deactivate IDE tools (reduce junior perception in skills grid)
    targets_remove: list[str] = ['VS Code', 'Cursor', 'AI tools']
    cur.execute(
        f"UPDATE skills SET is_active = 0 WHERE name IN ({','.join('?' * len(targets_remove))})",
        targets_remove,
    )
    print(f'[OK] Deactivated {cur.rowcount} skills: {targets_remove}')

    # 2. Upsert production-relevant skills
    upserts: list[tuple[str, str, str, int, str, int]] = [
        ('Storybook', 'Storybook', 'TOOLS', 85, 'icons/storybook.svg', 14),
        ('Vite', 'Vite', 'TOOLS', 85, 'icons/vite.svg', 15),
        ('React Hook Form', 'React Hook Form', 'FRONTEND', 85, 'icons/react-hook-form.svg', 16),
        ('Zod', 'Zod', 'FRONTEND', 80, 'icons/zod.svg', 17),
    ]

    for name, name_pt, category, proficiency, icon_url, display_order in upserts:
        cur.execute("SELECT id FROM skills WHERE name = ?", (name,))
        row = cur.fetchone()
        if row:
            cur.execute(
                "UPDATE skills SET is_active = 1, proficiency = ?, icon_url = ?, display_order = ?"
                " WHERE name = ?",
                (proficiency, icon_url, display_order, name),
            )
            print(f'[OK] {name}: activated')
        else:
            cur.execute(
                "INSERT INTO skills (name, name_pt, category, proficiency, icon_url, display_order,"
                " is_active) VALUES (?, ?, ?, ?, ?, ?, 1)",
                (name, name_pt, category, proficiency, icon_url, display_order),
            )
            print(f'[OK] {name}: inserted')

    conn.commit()

    print()
    print('=== Active skills after migration ===')
    cur.execute(
        'SELECT name, category, proficiency FROM skills WHERE is_active = 1'
        ' ORDER BY category, display_order'
    )
    for row in cur.fetchall():
        print(f'  [{row[1]:12}] {row[0]:30} prof={row[2]}')

    conn.close()
    print()
    print('Migration complete.')


if __name__ == '__main__':
    run()
