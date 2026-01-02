# 🚀 Manual de Deploy: React/Vite no EasyPanel

Este documento serve como guia rápido para subir sites estáticos (React/Vite) no EasyPanel utilizando Docker.

---

## 📋 1. Preparação Local (VS Code)

Antes de enviar o projeto, garanta que o arquivo `.gitignore` existe na raiz para não enviar "lixo" para o servidor.

**Arquivo `.gitignore`:**

```gitignore
node_modules
dist
build
.env
.DS_Store
```

**Comandos Git (Para novos projetos):**

```bash
git init
git add .
git commit -m "Upload inicial"
git branch -M main
# Substitua pela URL do seu repositório criado no GitHub
git remote add origin https://github.com/SEU_USUARIO/NOME_DO_REPO.git
git push -u origin main
```

---

## ⚙️ 2. Configuração no EasyPanel

Crie um novo Service do tipo **App**. Configure as abas conforme abaixo:

### Aba "Source" (Fonte)

| Campo      | Valor                                                              |
| ---------- | ------------------------------------------------------------------ |
| Type       | Git                                                                |
| Repository | nome-do-repo (Apenas o nome, ex: `dranataliabarreto`)              |
| User       | Seu usuário do GitHub                                              |
| Token      | Cole seu Token de Acesso Pessoal (começa com `ghp_...`)            |

> [!IMPORTANT]
> Não use a senha da conta, o GitHub exige o Token.

### Aba "Build" (Construção) — ⚠️ IMPORTANTE

O segredo para o site não ficar em branco está aqui.

| Campo         | Valor      |
| ------------- | ---------- |
| Build Method  | Nixpacks   |

**Start Command (Comando de Início):**

Copie e cole este comando exato:

```bash
npx -y serve -s dist -l 80
```

**Explicação do comando:**

| Parte          | Descrição                                    |
| -------------- | -------------------------------------------- |
| `npx -y serve` | Baixa um servidor leve na hora               |
| `-s`           | Modo SPA (evita erro 404 ao atualizar a página) |
| `dist`         | Pasta onde o Vite gera o site                |
| `-l 80`        | Força a rodar na porta 80                    |

---

## 🌐 3. Configuração de Domínio (Evitar Erro 500)

Para o SSL (cadeado) funcionar e o site abrir:

1. Vá na aba **Domains**
2. Adicione o domínio (ex: `cliente.com.br`)
3. Clique no **Lápis** (Editar) e configure:

| Campo         | Valor      |
| ------------- | ---------- |
| HTTPS         | ✅ Ligado   |
| Force HTTPS   | ✅ Ligado   |
| Port (Porta)  | 80         |
| Protocol      | **HTTP**   |

> [!CAUTION]
> **MUITO IMPORTANTE:** No campo Protocol (Destino), não coloque HTTPS. Deve ser **HTTP**.

---

## 📂 4. Deploy em Subdiretório (Ex: `/nova-lp`)

Se o site não for o principal e tiver que abrir em `meusite.com/nova-lp`:

### Passo A: No EasyPanel (Aba Domains)

No serviço da Landing Page:

| Campo | Valor       |
| ----- | ----------- |
| Host  | meusite.com |
| Path  | /nova-lp    |

### Passo B: No Código (`vite.config.ts`)

Você precisa configurar a "base" no Vite, senão a tela fica branca.

**Arquivo `vite.config.ts`:**

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  // O nome aqui deve ser IDÊNTICO ao "Path" do EasyPanel
  base: '/nova-lp/', 
  plugins: [react()],
})
```

> [!TIP]
> Faça o commit e push dessa alteração.

---

## 🆘 Solução de Problemas

| Problema                        | Causa Provável                     | Solução                                                                 |
| ------------------------------- | ---------------------------------- | ----------------------------------------------------------------------- |
| Erro 500 (Internal Server Error)| Protocolo de destino errado        | Edite o domínio e mude o destino para **HTTP** (não HTTPS)              |
| Tela Branca                     | Servidor não achou a pasta `dist`  | Verifique se o Start Command está: `npx -y serve -s dist -l 80`         |
| Tela Branca (Subdiretório)      | Faltou configurar o `base`         | Edite o `vite.config.ts` conforme o passo 4                             |
| Site "Não Seguro"               | SSL falhou na geração              | Corrija o erro 500 primeiro. O SSL é gerado automaticamente após o site subir corretamente |
