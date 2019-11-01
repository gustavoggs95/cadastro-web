import React, { Component } from 'react'
import '../assets/Register.css'
import TextField from '@material-ui/core/TextField';

class Nome extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={'name-container ' + (this.props.step == 0 ? 'fadeInNome' : 'fadeOutNome')}>
                <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="nome"
                        label="Nome"
                        name="nome"
                        value={this.props.nome}
                        autoComplete="off"
                        autoFocus
                        onChange={(e)=> {
                            this.props.mudarNome(e.target.value)
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="sobrenome"
                        label="Sobrenome"
                        name="sobrenome"
                        value={this.props.sobrenome}
                        autoComplete="off"
                        onChange={(e)=> {
                            this.props.mudarSobrenome(e.target.value)
                        }}
                    />
            </div>
        )
    }
}

export default Nome