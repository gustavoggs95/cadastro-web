import React, { Component } from 'react'
import '../assets/Register.css'
import TextField from '@material-ui/core/TextField';

class Endereco extends Component {
    constructor(props){
        super(props)
    }

    render(){
        return(
            <div className={'endereco-container ' + (this.props.step == 1 ? 'fadeInEndereco' : 'fadeOutEndereco')}>
                <TextField
                        disabled={this.props.step == 0 ? true : false}
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        id="rua"
                        label="Rua"
                        name="rua"
                        required
                        value={this.props.rua}
                        autoComplete="off"
                        onChange={(e)=> {
                            this.props.mudarRua(e.target.value)
                        }}
                    />
                    <TextField
                        disabled={this.props.step == 0 ? true : false}
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="numero"
                        value={this.props.numero}
                        label="Numero"
                        name="numero"
                        autoComplete="off"
                        onChange={(e)=> {
                            this.props.mudarNumero(e.target.value)
                        }}
                    />
            </div>
        )
    }
}

export default Endereco