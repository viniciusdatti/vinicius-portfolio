# Fluxo de contato → Gmail

Objetivo: quando alguém preenche o formulário de contato no site, você recebe no Gmail o **assunto**, os **dados da pessoa** (nome, email, empresa) e a **mensagem**, e pode responder direto pelo Gmail (Reply).

---

## O que já está implementado

| Etapa | Onde | O que acontece |
|-------|------|-----------------|
| 1. Formulário | Frontend (Contact) | Usuário preenche: nome, email, empresa (opcional), assunto (opcional), mensagem. |
| 2. Envio | Frontend → API | `POST /api/v1/contact` com todos os campos. |
| 3. Backend | FastAPI | Salva no banco (contact_submissions) e dispara envio de email em background. |
| 4. Email | Resend | Monta um email com: assunto do formulário no título, nome, email, empresa, assunto e mensagem no corpo; envia para **EMAIL_TO_ADMIN** com **reply_to** = email do visitante (para você responder direto no Gmail). |

Ou seja: o **fluxo de código está completo**. O que falta é só **configuração** para o email sair e chegar no seu Gmail.

---

## O que falta para o email chegar no Gmail

### 1. Chave da API Resend (obrigatório)

Sem isso o backend não envia email (e aparece no log: *"Resend API key not configured. Email service disabled."*).

- Acesse [resend.com](https://resend.com) → crie conta se precisar.
- **API Keys** → **Create API Key** → copie a chave (começa com `re_`).
- No projeto, abra **`backend/.env`** e defina:
  ```env
  RESEND_API_KEY=re_sua_chave_aqui
  ```

### 2. Para onde enviar (seu Gmail)

No mesmo **`backend/.env`**:

```env
EMAIL_TO_ADMIN=viniciusdatti@gmail.com
```

Assim todos os contatos do formulário vão para esse endereço.

### 3. Endereço “De” (quem envia)

O Resend exige que o **remetente** seja um domínio verificado na conta deles.

**Opção A – Domínio próprio (ex.: viniciusdatti.dev)**  
- No Resend: **Domains** → **Add Domain** → siga as instruções de DNS.  
- No **`backend/.env`**:
  ```env
  EMAIL_FROM=noreply@viniciusdatti.dev
  ```

**Opção B – Testar sem domínio (só desenvolvimento)**  
- No Resend, use o domínio de teste (ex.: **onboarding@resend.dev** – confira no painel qual está disponível).  
- No **`backend/.env`**:
  ```env
  EMAIL_FROM=onboarding@resend.dev
  ```
- No plano gratuito o Resend pode limitar destinatários em testes; para uso “de verdade” use domínio verificado.

### 4. Reiniciar o backend

Depois de alterar o **`backend/.env`**:

- Pare o backend (Ctrl+C no terminal onde está rodando).
- Suba de novo (ex.: `vd-dl up`).

---

## Como conferir se está certo

1. **Log ao subir o backend**  
   - Não deve aparecer *"Resend API key not configured"*.  
   - Se aparecer, a `RESEND_API_KEY` não está sendo lida (arquivo `.env` no caminho certo e variável sem aspas/erro de digitação).

2. **Enviar um contato de teste**  
   - Preencha o formulário no site (incluindo assunto e mensagem) e envie.  
   - No terminal do backend deve aparecer algo como:  
     *"Contact notification email sent to viniciusdatti@gmail.com"*.  
   - Se aparecer *"Failed to send contact notification email"*, veja a mensagem de erro no log (ex.: domínio não verificado no Resend).

3. **No Gmail**  
   - Verifique a caixa de entrada e **spam**.  
   - O email deve ter: assunto tipo *"[Portfolio] Nova mensagem de [Nome]: [Assunto do formulário]"*, corpo com nome, email, empresa, assunto e mensagem, e ao clicar em **Responder** o destinatário deve ser o email do visitante.

---

## Resumo do que você recebe no Gmail

- **Assunto do email:** `[Portfolio] Nova mensagem de [Nome da pessoa]` e, se ela preencheu o campo “Assunto” no formulário, fica `: [Assunto]`.
- **Corpo:** Nome, email, empresa (se tiver), assunto (se tiver), mensagem.
- **Responder:** o Reply do Gmail vai para o email da pessoa que entrou em contato.

O fluxo da pessoa “entrar em contato com você” = “enviar assunto e contato direto no seu Gmail” está implementado; falta apenas configurar **RESEND_API_KEY**, **EMAIL_TO_ADMIN** e **EMAIL_FROM** no **`backend/.env`** e reiniciar o backend.
