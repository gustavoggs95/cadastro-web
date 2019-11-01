import { getAllData } from '../../services/api.js'

export const buscaDadosInicio = () => {
    return {
        type: 'BUSCA_DADOS_INICIO',
        carregando: true,
        erro: false
    }
}

export const buscaDadosSucesso = (dados) => {
    console.log('buscaDadosSucesso: ', dados)
    return {
        type: 'BUSCA_DADOS_SUCESSO',
        carregando: false,
        dados,
        error: false
    }
}

export const buscaDadosErro = (erro) => {
    return {
        type: 'BUSCA_DADOS_ERRO',
        carregando: false,
        error: true
    }
}

export const buscaDados = () => {
    return dispatch => {
        dispatch(buscaDadosInicio())
        getAllData()
            .then(res => dispatch(buscaDadosSucesso(res.data)))
            .catch(err => dispatch(buscaDadosErro()))
    }
}