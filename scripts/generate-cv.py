"""
Vinicius Datti — CV Generator v2.

Big-tech layout: white background, dark typography, hierarchy via weight and spacing.
Single page, ATS-friendly, validated for black-and-white printing.

Usage:
    cd vinicius-portfolio
    pip install reportlab
    python scripts/generate-cv.py
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether,
)
from reportlab.lib.styles import ParagraphStyle

W, H = A4

# Palette — white background; C_DIM meets WCAG AA (4.54:1) on white.
C_STRONG = colors.HexColor('#0A0A0A')
C_INK = colors.HexColor('#1A1A1A')
C_MID = colors.HexColor('#444444')
C_DIM = colors.HexColor('#767676')
C_ACCENT = colors.HexColor('#0F4C81')  # single accent for eyebrows and stack italics
C_RULE = colors.HexColor('#E2E2E2')
C_TAG_BG = colors.HexColor('#F0F2F5')
C_TAG_BG2 = colors.HexColor('#E8EBF0')
C_TAG_TEXT = colors.HexColor('#1F2937')

FONT_REG = 'Helvetica'
FONT_BOLD = 'Helvetica-Bold'
FONT_OBL = 'Helvetica-Oblique'


def _s(name: str, **kw: object) -> ParagraphStyle:
    defaults: dict[str, object] = {
        'fontName': FONT_REG,
        'fontSize': 8.2,
        'textColor': C_INK,
        'leading': 12.5,
        'spaceAfter': 0,
        'spaceBefore': 0,
        'leftIndent': 0,
        'rightIndent': 0,
    }
    defaults.update(kw)
    return ParagraphStyle(name, **defaults)


ST_NAME = _s(
    'Name', fontName=FONT_BOLD, fontSize=23, textColor=C_STRONG,
    leading=27, spaceAfter=1.2 * mm,
)
ST_ROLE = _s(
    'Role', fontName=FONT_REG, fontSize=11, textColor=C_MID,
    leading=14, spaceAfter=1.8 * mm,
)
ST_CONTACT = _s('Ctct', fontName=FONT_REG, fontSize=7.5, textColor=C_DIM, leading=10)
ST_EYEBROW = _s(
    'Eye', fontName=FONT_BOLD, fontSize=6.8, textColor=C_ACCENT, leading=9,
    spaceBefore=3.5 * mm, spaceAfter=1.8 * mm,
)
ST_SUMMARY = _s('Sum', fontName=FONT_REG, fontSize=8.0, textColor=C_INK, leading=12.5)
ST_JOB_TITLE = _s(
    'JT', fontName=FONT_BOLD, fontSize=9.2, textColor=C_STRONG,
    leading=13, spaceAfter=0.6 * mm,
)
ST_JOB_META = _s(
    'JM', fontName=FONT_REG, fontSize=7.8, textColor=C_MID,
    leading=11.5, spaceAfter=1.2 * mm,
)
ST_BULLET = _s(
    'Bul', fontName=FONT_REG, fontSize=8.0, textColor=C_INK, leading=12,
    leftIndent=6.5 * mm, firstLineIndent=-2.8 * mm, spaceAfter=0.9 * mm,
)
ST_PROJ_NAME = _s(
    'PN', fontName=FONT_BOLD, fontSize=8.2, textColor=C_STRONG,
    leading=12, spaceAfter=0.4 * mm,
)
ST_PROJ_STK = _s(
    'PS', fontName=FONT_OBL, fontSize=7.5, textColor=C_ACCENT,
    leading=10.5, spaceAfter=0.8 * mm,
)
ST_PROJ_DESC = _s('PD', fontName=FONT_REG, fontSize=8.0, textColor=C_INK, leading=12)
ST_EDU_TITLE = _s(
    'ET', fontName=FONT_BOLD, fontSize=8.2, textColor=C_STRONG,
    leading=12, spaceAfter=0.4 * mm,
)
ST_EDU_META = _s(
    'EM', fontName=FONT_REG, fontSize=8.0, textColor=C_MID,
    leading=11.5,
)
ST_BODY = _s('Bod', fontName=FONT_REG, fontSize=8.0, textColor=C_INK, leading=12)
ST_LANG_EYE = _s(
    'LE', fontName=FONT_BOLD, fontSize=6.8, textColor=C_ACCENT, leading=9,
    spaceBefore=0, spaceAfter=1.8 * mm,
)
ST_LANG = _s('Lng', fontName=FONT_REG, fontSize=8.0, textColor=C_INK, leading=12)
ST_LANG_NOTE = _s(
    'LN', fontName=FONT_REG, fontSize=7.2, textColor=C_DIM, leading=10.5,
)


def _rule(sb: float = 0.8 * mm, sa: float = 2 * mm) -> HRFlowable:
    return HRFlowable(
        width='100%', thickness=0.4, color=C_RULE,
        spaceAfter=sa, spaceBefore=sb,
    )


def _eyebrow(text: str) -> Paragraph:
    return Paragraph(text.upper(), ST_EYEBROW)


def _blt(text: str) -> Paragraph:
    return Paragraph(f'\u2022\u2002{text}', ST_BULLET)


def _gap(h: float) -> Spacer:
    return Spacer(1, h)


def _chips(rows: list[list[str]]) -> Table:
    chip_st = ParagraphStyle(
        'Ch', fontName=FONT_BOLD, fontSize=7.2,
        textColor=C_TAG_TEXT, leading=9,
    )
    data = [[Paragraph(cell, chip_st) for cell in row] for row in rows]
    chip_width = (W - 36 * mm) / 5
    table = Table(data, colWidths=[chip_width] * 5)
    table.setStyle(TableStyle([
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [C_TAG_BG, C_TAG_BG2]),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('TOPPADDING', (0, 0), (-1, -1), 3.2),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3.2),
        ('LEFTPADDING', (0, 0), (-1, -1), 2),
        ('RIGHTPADDING', (0, 0), (-1, -1), 2),
        ('GRID', (0, 0), (-1, -1), 0.3, C_RULE),
    ]))
    return table


def build_cv(output_path: str) -> None:
    doc = SimpleDocTemplate(
        output_path, pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=13 * mm, bottomMargin=11 * mm,
        title='Vinicius Datti \u2014 Frontend Engineer',
        author='Vinicius Datti',
        subject='Curriculum Vitae',
    )

    story = []

    # Header
    story += [
        Paragraph('Vinicius Datti', ST_NAME),
        Paragraph('Frontend Engineer', ST_ROLE),
        Paragraph(
            'S\u00e3o Paulo, BR\u2002\u00b7\u2002viniciusdatti@gmail.com'
            '\u2002\u00b7\u2002linkedin.com/in/vinicius-datti'
            '\u2002\u00b7\u2002github.com/viniciusdatti',
            ST_CONTACT),
        _rule(sb=2.5 * mm, sa=2 * mm),
    ]

    # Summary
    story += [
        _eyebrow('Resumo Profissional'),
        Paragraph(
            '3 anos e 4 meses em produ\u00e7\u00e3o presencial construindo SPAs robustas com React e TypeScript. '
            'Entregou dashboards industriais com telemetria WebSocket, design system com Storybook, '
            'auth JWT completo e testes Jest e Playwright em CI/CD. '
            'Orientado a c\u00f3digo limpo, componentiza\u00e7\u00e3o modular e qualidade em times \u00e1geis. '
            'Busca vaga remota ou h\u00edbrida como Frontend Engineer ou Software Engineer.',
            ST_SUMMARY),
        _rule(),
    ]

    # Stack
    story += [
        _eyebrow('Stack T\u00e9cnica'),
        _chips([
            ['React 18+', 'TypeScript', 'WebSocket / Socket.io', 'Styled-components', 'Storybook'],
            ['React Hook Form', 'Zod', 'Axios', 'Jest', 'Playwright'],
            ['react-i18next', 'Vite', 'Git / GitHub Actions', 'Python / FastAPI', 'PostgreSQL'],
        ]),
        _rule(),
    ]

    # Experience
    story.append(_eyebrow('Experi\u00eancia Profissional'))
    story.append(KeepTogether([
        Paragraph('Frontend Engineer', ST_JOB_TITLE),
        Paragraph(
            'Superior Industries Inc\u2002\u00b7\u2002S\u00e3o Paulo, BR'
            '\u2002\u00b7\u2002Presencial'
            '\u2002\u00b7\u2002<b>Fev 2023 \u2013 Mai 2026 \u00b7 3 anos 4 meses</b>',
            ST_JOB_META),
    ]))
    for bullet in [
        'Desenvolveu SPAs de alta complexidade com React, TypeScript e Vite \u2014 componentiza\u00e7\u00e3o modular, mobile-first e otimiza\u00e7\u00f5es de renderiza\u00e7\u00e3o e bundle.',
        'Construiu formul\u00e1rios multi-step com React Hook Form e Zod \u2014 valida\u00e7\u00f5es robustas, tratamento de erros e feedback visual consistente.',
        'Implementou suporte multil\u00edngue com react-i18next \u2014 organiza\u00e7\u00e3o de chaves de tradu\u00e7\u00e3o e consist\u00eancia entre idiomas.',
        'Integrou APIs REST com Axios \u2014 interceptadores para autentica\u00e7\u00e3o JWT, refresh token, retry logic e normaliza\u00e7\u00e3o de payloads.',
        'Construiu dashboard de monitoramento em tempo real com WebSocket \u2014 streams cont\u00ednuos de telemetria, thresholds din\u00e2micos e estados cr\u00edticos.',
        'Criou e manteve Design System com Styled-components e Storybook \u2014 tokens de design, documenta\u00e7\u00e3o t\u00e9cnica e consist\u00eancia entre m\u00f3dulos.',
        'Estruturou cobertura de testes Jest e Playwright integrada a CI/CD \u2014 reduzindo regress\u00f5es em fluxos cr\u00edticos.',
        'Participou de code reviews e decis\u00f5es de arquitetura em squads \u00e1geis \u2014 padr\u00f5es, ESLint e TypeScript strict.',
        'Documentou componentes, fluxos e padr\u00f5es t\u00e9cnicos \u2014 facilitando onboarding e evolu\u00e7\u00e3o da base de c\u00f3digo.',
    ]:
        story.append(_blt(bullet))
    story.append(_rule())

    # Projects
    story.append(_eyebrow('Projetos em Destaque'))
    for title, stk, desc in [
        ('Portf\u00f3lio Full-Stack',
         'React 19 \u00b7 TypeScript \u00b7 WebSocket / Socket.io \u00b7 FastAPI \u00b7 Storybook',
         'Backend FastAPI + Socket.IO e frontend React 19 (Vite). Live Lab com telemetria ao vivo \u2014 '
         'streams WebSocket, thresholds configur\u00e1veis, log de eventos e gr\u00e1fico de tend\u00eancia. '
         'Design system pr\u00f3prio com dark/light mode.'),
        ('Design System \u2014 Biblioteca de Componentes',
         'React \u00b7 TypeScript \u00b7 Styled-components \u00b7 Storybook',
         'Biblioteca reutiliz\u00e1vel com documenta\u00e7\u00e3o interativa via Storybook, '
         'tokens de design e suporte a varia\u00e7\u00f5es de estado e tema.'),
        ('Dashboard Industrial \u2014 Monitoramento em Tempo Real',
         'React \u00b7 TypeScript \u00b7 WebSocket \u00b7 Styled-components',
         'SPA de monitoramento com WebSocket bidirecional, estados cr\u00edticos de m\u00e1quina '
         'e arquitetura modular orientada a escalabilidade e performance.'),
    ]:
        story.append(KeepTogether([
            Paragraph(title, ST_PROJ_NAME),
            Paragraph(stk,   ST_PROJ_STK),
            Paragraph(desc,  ST_PROJ_DESC),
            _gap(1.5 * mm),
        ]))

    story.append(_rule(sa=1.5 * mm))

    # Education and languages (two columns)
    story.append(_eyebrow('Forma\u00e7\u00e3o Acad\u00eamica'))

    available_width = W - 36 * mm
    col_left = [
        Paragraph('Bacharelado em Engenharia de Software', ST_EDU_TITLE),
        Paragraph('UniCesumar \u00b7 S\u00e3o Paulo, BR \u00b7 Previs\u00e3o: Mai 2027', ST_EDU_META),
        _gap(1.5 * mm),
        Paragraph('Forma\u00e7\u00e3o Complementar', ST_EDU_TITLE),
        Paragraph(
            '400+ horas em React, TypeScript, testes e Python '
            '\u2014 Udemy, RocketSeat e Alura.',
            ST_BODY,
        ),
    ]
    col_right = [
        Paragraph('IDIOMAS', ST_LANG_EYE),
        Paragraph('<b>Portugu\u00eas</b> \u2014 Nativo', ST_LANG),
        Paragraph('<b>Ingl\u00eas</b> \u2014 T\u00e9cnico', ST_LANG),
        Paragraph('(documenta\u00e7\u00e3o, c\u00f3digo, escrita profissional)', ST_LANG_NOTE),
    ]

    two_col = Table(
        [[col_left, col_right]],
        colWidths=[available_width * 0.65, available_width * 0.35],
    )
    two_col.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
        ('TOPPADDING', (0, 0), (-1, -1), 0),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(two_col)

    doc.build(story)
    print(f'PDF generated at {output_path}')


if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    public_dir = os.path.join(repo_root, 'interfaces', 'web', 'public')
    os.makedirs(public_dir, exist_ok=True)
    output = os.path.join(public_dir, 'vinicius-datti-frontend-engineer-cv.pdf')
    build_cv(output)
