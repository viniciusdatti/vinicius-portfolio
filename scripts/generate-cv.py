"""
Gera o CV em PDF de Vinicius Datti e coloca em interfaces/web/public/

Uso:
    cd vinicius-portfolio
    pip install reportlab
    python scripts/generate-cv.py
"""

import os
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable, Table, TableStyle
)

W, H = A4

C_BG     = colors.HexColor('#0B0D10')
C_FG     = colors.HexColor('#E8EAF0')
C_ACCENT = colors.HexColor('#00B4D8')
C_DIM    = colors.HexColor('#8B9DC3')
C_RULE   = colors.HexColor('#1E2433')
C_HIGH   = colors.HexColor('#FFFFFF')


def build_cv(output_path: str) -> None:
    doc = SimpleDocTemplate(
        output_path,
        pagesize=A4,
        leftMargin=18 * mm, rightMargin=18 * mm,
        topMargin=14 * mm, bottomMargin=14 * mm,
    )

    name_style = ParagraphStyle('Name', fontName='Helvetica-Bold', fontSize=22,
        textColor=C_HIGH, spaceAfter=1 * mm, leading=26)
    role_style = ParagraphStyle('Role', fontName='Helvetica', fontSize=11,
        textColor=C_ACCENT, spaceAfter=2 * mm, leading=14)
    contact_style = ParagraphStyle('Contact', fontName='Helvetica', fontSize=8,
        textColor=C_DIM, spaceAfter=0, leading=11)
    eyebrow_style = ParagraphStyle('Eyebrow', fontName='Helvetica-Bold', fontSize=7.5,
        textColor=C_ACCENT, spaceAfter=2 * mm, spaceBefore=5 * mm,
        letterSpacing=1.5, leading=10)
    body_style = ParagraphStyle('Body', fontName='Helvetica', fontSize=8.5,
        textColor=C_FG, spaceAfter=1.5 * mm, leading=13)
    bullet_style = ParagraphStyle('Bullet', fontName='Helvetica', fontSize=8.2,
        textColor=C_FG, spaceAfter=1.5 * mm, leading=12.5,
        leftIndent=10, bulletIndent=0)
    bold_inline = ParagraphStyle('BoldInline', fontName='Helvetica-Bold', fontSize=8.5,
        textColor=C_HIGH, spaceAfter=0.5 * mm, leading=13)
    dim_style = ParagraphStyle('Dim', fontName='Helvetica', fontSize=7.8,
        textColor=C_DIM, spaceAfter=1 * mm, leading=11)
    tag_style = ParagraphStyle('Tag', fontName='Helvetica-Bold', fontSize=7.5,
        textColor=C_ACCENT, leading=10)
    section_title = ParagraphStyle('SectionTitle', fontName='Helvetica-Bold', fontSize=9,
        textColor=C_HIGH, spaceAfter=1.5 * mm, spaceBefore=4 * mm, leading=12)

    def rule():
        return HRFlowable(width='100%', thickness=0.5, color=C_RULE, spaceAfter=3 * mm, spaceBefore=1 * mm)

    def eyebrow(txt):
        return Paragraph(txt.upper(), eyebrow_style)

    def bullet(txt):
        return Paragraph(f'<bullet>\u2022</bullet>{txt}', bullet_style)

    story = []

    # HEADER
    story.append(Paragraph('Vinicius Datti', name_style))
    story.append(Paragraph(
        'Front-end Engineer &nbsp;&nbsp;\u00b7&nbsp;&nbsp; React &nbsp;\u00b7&nbsp; TypeScript &nbsp;\u00b7&nbsp; WebSocket &nbsp;\u00b7&nbsp; Design Systems',
        role_style))
    story.append(Paragraph(
        'S\u00e3o Paulo, BR &nbsp;&nbsp;|&nbsp;&nbsp; viniciusdatti@gmail.com &nbsp;&nbsp;|&nbsp;&nbsp; '
        'linkedin.com/in/vinicius-datti &nbsp;&nbsp;|&nbsp;&nbsp; github.com/viniciusdatti',
        contact_style))
    story.append(rule())

    # RESUMO
    story.append(eyebrow('Resumo Profissional'))
    story.append(Paragraph(
        'Desenvolvedor Front-end com 3 anos e 4 meses de experi\u00eancia presencial em produ\u00e7\u00e3o, '
        'construindo SPAs robustas com React e TypeScript. Entregou dashboards industriais com '
        'telemetria WebSocket em tempo real, design system com Storybook, fluxos completos de '
        'autentica\u00e7\u00e3o JWT, cobertura de testes Jest e Playwright integrada a CI/CD. '
        'Orientado a c\u00f3digo limpo, componentiza\u00e7\u00e3o modular e qualidade em times \u00e1geis. '
        'Em busca ativa de vagas remotas ou h\u00edbridas como Front-end Engineer ou Software Engineer.',
        body_style))
    story.append(rule())

    # STACK
    story.append(eyebrow('Stack T\u00e9cnica'))
    stack_data = [
        ['React 18+', 'TypeScript', 'WebSocket / Socket.io', 'Styled-components', 'Storybook'],
        ['React Hook Form', 'Zod', 'Axios', 'Jest', 'Playwright'],
        ['react-i18next', 'Vite', 'Git / GitHub Actions', 'Python / FastAPI', 'PostgreSQL'],
    ]
    tbl = Table(stack_data, colWidths=[35 * mm] * 5, rowHeights=6.5 * mm)
    tbl.setStyle(TableStyle([
        ('FONTNAME', (0, 0), (-1, -1), 'Helvetica-Bold'),
        ('FONTSIZE', (0, 0), (-1, -1), 8),
        ('TEXTCOLOR', (0, 0), (-1, -1), C_ACCENT),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('ROWBACKGROUNDS', (0, 0), (-1, -1), [colors.HexColor('#111520'), colors.HexColor('#0F1219')]),
        ('GRID', (0, 0), (-1, -1), 0.3, C_RULE),
        ('TOPPADDING', (0, 0), (-1, -1), 3),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 3),
    ]))
    story.append(tbl)
    story.append(rule())

    # EXPERIENCIA
    story.append(eyebrow('Experi\u00eancia Profissional'))
    story.append(Paragraph('Front-end Engineer', bold_inline))
    story.append(Paragraph(
        'Superior Industries Inc \u00b7 S\u00e3o Paulo, BR \u00b7 Presencial &nbsp;&nbsp;|&nbsp;&nbsp; Fev 2023 \u2013 Mai 2026 \u00b7 3 anos 4 meses',
        dim_style))
    items_pt = [
        'Desenvolveu SPAs de alta complexidade com React, TypeScript e Vite \u2014 componentiza\u00e7\u00e3o modular, mobile-first e otimiza\u00e7\u00f5es de renderiza\u00e7\u00e3o e bundle.',
        'Construiu formul\u00e1rios multi-step com React Hook Form e Zod \u2014 valida\u00e7\u00f5es robustas, tratamento de erros e feedback visual consistente.',
        'Implementou suporte multil\u00edngue com react-i18next \u2014 organiza\u00e7\u00e3o de chaves de tradu\u00e7\u00e3o e consist\u00eancia entre idiomas.',
        'Integrou APIs REST com Axios \u2014 interceptadores para autentica\u00e7\u00e3o JWT, refresh token, retry logic e normaliza\u00e7\u00e3o de payloads.',
        'Construiu dashboard de monitoramento em tempo real com WebSocket \u2014 streams cont\u00ednuos de telemetria, thresholds din\u00e2micos e gest\u00e3o de estados cr\u00edticos.',
        'Criou e manteve Design System com Styled-components e Storybook \u2014 tokens de design, documenta\u00e7\u00e3o t\u00e9cnica e consist\u00eancia visual entre m\u00f3dulos.',
        'Estruturou cobertura de testes com Jest e Playwright integrada a CI/CD \u2014 reduzindo regress\u00f5es em fluxos cr\u00edticos.',
        'Participou de code reviews e decis\u00f5es de arquitetura em squads \u00e1geis \u2014 padr\u00f5es, ESLint e TypeScript strict.',
        'Documentou componentes, fluxos e padr\u00f5es t\u00e9cnicos \u2014 facilitando onboarding e evolu\u00e7\u00e3o cont\u00ednua da base de c\u00f3digo.',
    ]
    for item in items_pt:
        story.append(bullet(item))
    story.append(rule())

    # PROJETOS
    story.append(eyebrow('Projetos em Destaque'))
    projects = [
        ('Portf\u00f3lio Full-Stack \u2014 viniciusdatti-portfolio.vercel.app',
         'React 19 \u00b7 TypeScript \u00b7 WebSocket / Socket.io \u00b7 FastAPI \u00b7 Storybook',
         'Portf\u00f3lio full-stack com backend FastAPI + Socket.IO e frontend React 19 (Vite). '
         'Live Lab com telemetria ao vivo \u2014 streams de sensores via WebSocket, thresholds configur\u00e1veis, '
         'log de eventos e gr\u00e1fico de tend\u00eancia. Design system com Styled-components e dark/light mode.'),
        ('Design System \u2014 Biblioteca de Componentes',
         'React \u00b7 TypeScript \u00b7 Styled-components \u00b7 Storybook',
         'Biblioteca de componentes reutiliz\u00e1veis com documenta\u00e7\u00e3o interativa via Storybook, '
         'tokens de design e suporte a varia\u00e7\u00f5es de estado e tema.'),
        ('Dashboard Industrial \u2014 Monitoramento em Tempo Real',
         'React \u00b7 TypeScript \u00b7 WebSocket \u00b7 Styled-components',
         'SPA de monitoramento operacional com WebSocket bidirecional, gest\u00e3o de estados cr\u00edticos '
         'de m\u00e1quina e arquitetura modular orientada a escalabilidade e performance.'),
    ]
    for title, stack, desc in projects:
        story.append(Paragraph(title, bold_inline))
        story.append(Paragraph(stack, tag_style))
        story.append(Paragraph(desc, body_style))
        story.append(Spacer(1, 2 * mm))
    story.append(rule())

    # FORMACAO
    story.append(eyebrow('Forma\u00e7\u00e3o Acad\u00eamica'))
    story.append(Paragraph('Bacharelado em Engenharia de Software', bold_inline))
    story.append(Paragraph('UniCesumar \u00b7 S\u00e3o Paulo, BR &nbsp;&nbsp;|&nbsp;&nbsp; Previs\u00e3o: Mai 2027', dim_style))
    story.append(Spacer(1, 2 * mm))
    story.append(Paragraph('Forma\u00e7\u00e3o Complementar', section_title))
    story.append(Paragraph(
        '400+ horas certificadas em React, TypeScript, testes automatizados e Python \u2014 Udemy, RocketSeat e Alura.',
        body_style))
    story.append(rule())

    # IDIOMAS
    story.append(eyebrow('Idiomas'))
    story.append(Paragraph(
        '<b>Portugu\u00eas</b> \u2014 Nativo &nbsp;&nbsp;&nbsp; <b>Ingl\u00eas</b> \u2014 T\u00e9cnico (documenta\u00e7\u00e3o, c\u00f3digo, comunica\u00e7\u00e3o escrita profissional)',
        body_style))

    doc.build(story)
    print(f'PDF gerado em {output_path}')


if __name__ == '__main__':
    script_dir = os.path.dirname(os.path.abspath(__file__))
    repo_root = os.path.dirname(script_dir)
    public_dir = os.path.join(repo_root, 'interfaces', 'web', 'public')
    os.makedirs(public_dir, exist_ok=True)
    output = os.path.join(public_dir, 'vinicius-datti-frontend-engineer-cv.pdf')
    build_cv(output)
