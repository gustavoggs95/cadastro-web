const INITIAL_STATE = {
    dados: [],
    carregando: false,
    erro: false
}

export default function busca(state = INITIAL_STATE, action){
    switch(action.type){
        case 'BUSCA_DADOS_INICIO':
            return {
                ...state,
                carregando: true,
                erro: false
            }

        case 'BUSCA_DADOS_SUCESSO':
            return {
                dados: action.dados,
                carregando: false,
                erro: false
            }

        case 'BUSCA_DADOS_ERRO':
            return {
                dados: [],
                carregando: false,
                erro: true
            }

        default:
            return state
    }
}