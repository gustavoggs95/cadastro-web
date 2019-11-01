import { AddData } from '../../services/api.js'
import { buscaDados } from './busca-dados.js'

export const addDadosInicio = () => {
    return {
        type: 'ADD_DADOS_INICIO',
        carregandoAdd: true,
        erro: false,
        adicionado: false
    }
}

export const addDadosSucesso = (dadosAdd) => {
    return {
        type: 'ADD_DADOS_SUCESSO',
        carregandoAdd: false,
        dadosAdd,
        errorAdd: false,
        adicionado: true
    }
}

export const addDadosErro = (erro) => {
    return {
        type: 'ADD_DADOS_ERRO',
        carregandoAdd: false,
        errorAdd: true,
        adicionado: false
    }
}

export const addDadosRefresh = () => {
    return {
        type: 'ADD_DADOS_REFRESH',
        carregandoAdd: false,
        errorAdd: false,
        adicionado: false
    }
}

export const addDados = (data) => {
    return dispatch => {
        dispatch(addDadosInicio())
        AddData(data)
            .then(res => {
                dispatch(addDadosSucesso(res.data))
                dispatch(buscaDados())
            })
            .catch(err => dispatch(addDadosErro()))
    }
}

export const refreshDados = () => {
    return dispatch => {
        dispatch(addDadosRefresh())
    }
}