const INITIAL_STATE = {
    dadosAdd: {},
    carregandoAdd: false,
    erroAdd: false,
    adicionado: false
}

export default function adicionar(state = INITIAL_STATE, action){
    switch(action.type){
        case 'ADD_DADOS_INICIO':
            return {
                ...state,
                carregandoAdd: true,
                erroAdd: false,
                adicionado: false
            }

        case 'ADD_DADOS_SUCESSO':
            return {
                dadosAdd: action.dadosAdd,
                carregando: false,
                erroAdd: false,
                adicionado: true
            }

        case 'ADD_DADOS_ERRO':
            return {
                dadosAdd: {},
                carregando: false,
                erroAdd: true,
                adicionado: false
            }

        case 'ADD_DADOS_REFRESH':
            return {
                dadosAdd: {},
                carregando: false,
                erroAdd: false,
                adicionado: false
            }

        default:
            return state
    }
}