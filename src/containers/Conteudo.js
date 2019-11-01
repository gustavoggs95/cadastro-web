import React, { Component } from 'react'
import { connect } from 'react-redux'
import { buscaDados } from '../store/actions/busca-dados'
import { CircularProgress } from '@material-ui/core';
import '../assets/Content.css'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { DeleteData } from '../services/api.js'
import { Fab } from '@material-ui/core';
import DeleteOutline from '@material-ui/icons/DeleteOutline';

class Conteudo extends Component {
    constructor(props){
        super(props)

        this.state = {
            deletando: 0,
            deletedDate: []
        }
    }

    componentDidMount(){
        this.refresh()
    }

    refresh(){
        this.props.buscaDados()
    }

    deletarDados(id, date){
        this.setState({ 
            deletando: id
        })
        DeleteData(id).finally(() => {
            let deletedDate = this.state.deletedDate
            deletedDate.push(date)
            this.setState({ deletando: 0, deletedDate })
        })
    }

    render(){
        const { dados = [], carregando } = this.props
        return(
            <div className="content-page">
                <h1> Tabela de usuários </h1>
                <div className="card-container">
                    <Table className="table" aria-label="simple table">
                        <TableHead>
                        <TableRow>
                            <TableCell align="center">Nome</TableCell>
                            <TableCell align="center">Sobrenome</TableCell>
                            <TableCell align="center">Rua</TableCell>
                            <TableCell align="center">Numero</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {
                            dados.filter(a => !this.state.deletedDate.includes(a.data)).map((row, index) => (
                            <TableRow key={index}>
                                <TableCell align="center" component="th" scope="row"> {row.nome} </TableCell>
                                <TableCell align="center"> {row.sobrenome} </TableCell>
                                <TableCell align="center"> {row.rua} </TableCell>
                                <TableCell align="center"> {row.numero} </TableCell>
                                <TableCell align="center"> 
                                    <Fab size="small" onClick={()=>{ this.deletarDados(row.id, row.data) }} color="secondary" aria-label="edit">
                                        {
                                            this.state.deletando == row.id ?
                                            <CircularProgress size={20} style={{ color: 'white' }} />
                                            :
                                            <DeleteOutline />
                                        }
                                    </Fab>
                                </TableCell>
                            </TableRow>
                        ))
                        }
                        </TableBody>
                    </Table>
                    <div className="table-info">
                        {
                            this.props.carregando ?
                                <CircularProgress size={40} color="primary" />
                            :
                            dados.length > 0 ?
                                ''
                                :
                                <span style={{ color: 'rgb(117,117,117)' }}>
                                    Nenhum dado disponível.
                                </span>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        dados: state.busca.dados,
        carregando: state.busca.carregando
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
       buscaDados: () => dispatch(buscaDados())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Conteudo)