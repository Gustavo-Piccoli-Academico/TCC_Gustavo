// !!!! IMPORTANTE !!!!
// Esta é a sua chave secreta. Guarde-a aqui.
// Deve ser uma string longa, aleatória e única. Não a compartilhe.
const SECRET_KEY = "uma-frase-muito-secreta-e-dificil-de-adivinhar-987654321-XYZ";

/**
 * Gera o config.js com a senha ofuscada E a assinatura HMAC.
 */
function gerarEBaixarConfig() {
    const passwordInput = document.getElementById('passwordInput');
    const novaSenha = passwordInput.value;

    if (!novaSenha || novaSenha.length < 4) {
        alert("A senha precisa ter pelo menos 4 caracteres.");
        return;
    }

    const senhaOfuscada = btoa(novaSenha);
    
    // Cria a assinatura (selo de segurança) para a senha ofuscada usando a chave secreta.
    const assinatura = CryptoJS.HmacSHA256(senhaOfuscada, SECRET_KEY).toString();

    const conteudoDoArquivo = `
// Arquivo de configuração gerado em: ${new Date().toLocaleString()}
window.APP_CONFIG = {
    // A senha do professor, codificada em Base64 para não ser legível.
    professorPassword: "${senhaOfuscada}",

    // A assinatura digital que garante que o conteúdo acima não foi alterado.
    passwordSignature: "${assinatura}"
};
    `;

    // Cria um objeto de arquivo em memória (Blob)
    const blob = new Blob([conteudoDoArquivo], { type: 'text/javascript' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'config.js'; // O nome do arquivo que será baixado

    // Simula o clique no link para iniciar o download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    alert("Download do 'config.js' iniciado! Por favor, substitua o arquivo antigo na pasta da sua aplicação.");
}


/**
 * Lógica que roda na inicialização para VERIFICAR A INTEGRIDADE do arquivo.
 */
window.onload = function() {
    const config = window.APP_CONFIG;
    const setupDiv = document.getElementById('setupDiv');
    const appDiv = document.getElementById('appDiv');
    const tamperedDiv = document.getElementById('tamperedDiv');

    // Cenário 1: Estado inicial legítimo.
    // A tela de configuração só aparece se AMBOS os campos forem nulos.
    const isInitialState = !config || (!config.professorPassword && !config.passwordSignature);
    if (isInitialState) {
        setupDiv.style.display = 'block';
        return;
    }

    // Se chegamos aqui, pelo menos um dos valores existe.
    // Verificação de adulteração: se um existe e o outro não, o arquivo é inválido.
    const isPartiallyDefined = !config.professorPassword || !config.passwordSignature;
    if (isPartiallyDefined) {
        tamperedDiv.style.display = 'block';
        return;
    }

    // Cenário 2: Se ambos os valores existem, verificamos a integridade da assinatura.
    const senhaSalva = config.professorPassword;
    const assinaturaSalva = config.passwordSignature;

    // Recalcula a assinatura que o arquivo DEVERIA ter com base na senha salva e na chave secreta.
    const assinaturaCalculada = CryptoJS.HmacSHA256(senhaSalva, SECRET_KEY).toString();

    // Compara a assinatura do arquivo com a que acabamos de calcular.
    if (assinaturaSalva === assinaturaCalculada) {
        // SELO INTACTO! O arquivo é legítimo e não foi adulterado.
        appDiv.style.display = 'block';
    } else {
        // SELO ROMPIDO! O arquivo foi modificado manualmente.
        tamperedDiv.style.display = 'block';
    }
};

/**
 * Função para tentar o login no modo de aplicação normal.
 * A verificação de integridade já foi feita no window.onload.
 */
function tentarLoginProfessor() {
    const loginInput = document.getElementById('loginInput');
    const senhaDigitada = loginInput.value;

    // Codifica a senha que o usuário digitou...
    const senhaDigitadaOfuscada = btoa(senhaDigitada);
    
    // ...e compara com a senha ofuscada que está salva no arquivo config.js
    if (senhaDigitadaOfuscada === window.APP_CONFIG.professorPassword) {
        alert("Acesso de professor concedido!");
        // Aqui você pode adicionar o código para mostrar as funcionalidades do professor.
    } else {
        alert("Senha incorreta!");
    }
}

