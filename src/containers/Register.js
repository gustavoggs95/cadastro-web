import React, { Component } from 'react'
import Button from '@material-ui/core/Button';
import PersonAdd from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import '../assets/Register.css'
import Nome from '../components/Nome'
import Endereco from '../components/Endereco'
import { connect } from 'react-redux'
import { buscaDados } from '../store/actions/busca-dados'
import { addDados, addDadosRefresh } from '../store/actions/adiciona-dados'

import { getAllData } from '../services/api.js'

class Register extends Component {
    constructor(props){
        super(props)

        this.state = {
            step: 0,
            nome: '',
            sobrenome: '',
            numero: '',
            rua: '', 
            showError: false,
            errorMessage: ''
        }
    }

    goNext(){
        let step = this.state.step

        // tratamento dos campos
        if(this.state.nome.length == 0 || this.state.sobrenome.length == 0){
            this.setState({
                showError: true,
                errorMessage: 'Preencha os campos necessarios *'
            })
            return
        }
        // determina qual step o state deve ficar
        step = step == 0 ? 1 : 0

        this.setState({ 
            step,
            showError: false
        })
    }

    // busca todos os dados atraves da API
    _getAllData(){
        this.props.buscaDados()
    }

    // adiciona os dados preenchidos nos campos
    _addData(){

        // checa se o campo ja foi adicionado
        if(this.props.adicionado){
            this.reset()
            return
        }

        // valida os campos preenchidos
        if(this.state.rua.length == 0 || this.state.numero.length == 0){
            this.setState({
                showError: true,
                errorMessage: 'Preencha os campos necessarios *'
            })
            return
        }

        const { nome, sobrenome, rua, numero } = this.state

        // adiciona os dados na API de mock
        this.props.addDados({
            nome,
            sobrenome,
            rua,
            numero,
            data: new Date().toISOString()
        })

        this.setState({ showError: false })
    }

    mudarNome(nome){
        this.setState({ nome })
    }

    mudarSobrenome(sobrenome){
        this.setState({ sobrenome })
    }

    mudarNumero(numero){
        this.setState({ numero })
    }

    mudarRua(rua){
        this.setState({ rua })
    }

    // reseta os campos para o estado inicial
    reset(){
        this.setState({
            rua: '',
            nome: '',
            sobrenome: '',
            numero: '',
            step: 0
        })
        this.props.addDadosRefresh()
    }

    render(){
        return(
            <div className="register-page">
                <div className="side-menu">
                <div className="register-icon">
                    <PersonAdd />
                </div>
                <Typography component="h1" variant="h5">
                    Insira seus dados
                </Typography>
                <div className="form" noValidate>
                    <div className="step-container">
                        <Nome 
                            mudarNome={(nome) => this.mudarNome(nome)}
                            mudarSobrenome={(sobrenome) => this.mudarSobrenome(sobrenome)}
                            nome={this.state.nome}
                            sobrenome={this.state.sobrenome}
                            step={this.state.step}
                        />
                        <Endereco 
                            mudarRua={(rua) => this.mudarRua(rua)} 
                            mudarNumero={(numero) => this.mudarNumero(numero)}
                            rua={this.state.rua}
                            numero={this.state.numero}
                            step={this.state.step}
                        />
                    </div>
                    <div style={{ marginBottom: 10 }}>
                    {
                        this.state.step == 0 ?
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={()=> this.goNext()}
                            >
                                Proximo
                            </Button>
                        : // Mostra o botao de Next ou o de Adicionar
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                style={{backgroundColor: this.props.adicionado ? '#66bb6a' : '#3f51b5', color: 'white'}}
                                onClick={()=> this._addData()}
                            >
                            {
                                // mostra o texto no botao de adicionar com base em seu estado atual
                                this.props.carregandoAdd 
                                    ? 'Adding...'
                                    : this.props.adicionado
                                        ?   'Done'
                                        :   'Add'
                            }
                        </Button>
                    }
                    </div>
                    {
                        this.state.showError &&
                        <span style={{color: 'indianred'}}>
                            { this.state.errorMessage }
                        </span>
                    }
                </div>
                </div>
            </div>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        buscaDados: () => dispatch(buscaDados()),
        addDados: (data) => dispatch(addDados(data)),
        addDadosRefresh: () => dispatch(addDadosRefresh())
    }
}

const mapStateToProps = (state) => {
    return {
        carregandoAdd: state.adicionar.carregandoAdd,
        adicionado: state.adicionar.adicionado
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Register)