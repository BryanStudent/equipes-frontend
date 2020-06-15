import React, { useState, useEffect, Icon } from 'react';
import api from './api';
import Header from './header';
import { 
    Container, 
    Table, 
    TableRow, 
    TableCell, 
    TableHead,
    Dialog, 
    Button, 
    DialogTitle, 
    DialogContent, 
    DialogContentText, 
    TextField, 
    
    DialogActions} from '@material-ui/core';
import './style.css';

function App() {
    const [ lista, setLista ] = useState([]); 
    const [ open, setOpen ] = useState(false);
    const [ nome, setNome ] = useState('');
    const [ valormercado, setValormercado ] = useState('');
    const [ arena, setArena ] = useState('');
    const [ id, setId ] = useState('');
    const [ botaoEditar, setBotaoEditar ] = useState(false);
    const [ botaoAdicionar, setBotaoAdicionar ] = useState(false);
    
    
    
    function openModal() {
        setBotaoAdicionar(true);
        setBotaoEditar(false);
        setOpen(true);
    };

    function closeModal() {
        setOpen(false);
    };

    function listaEquipes(){
         api.get('/equipes').then((response) => {
            const itens = response.data;
            setLista(itens);
              setNome('');
                setValormercado('');
                 setArena('');
                setId('');
        });
    }

    useEffect(() => {
        listaEquipes();
    }, []);
    
    function addEquipe(){
        const name = nome;
        const value = valormercado;
        const stadium = arena;

        api.post('/equipes', {nome:name, valormercado:value, arena:stadium}).then((response) => {
            setNome('');
            setValormercado('');
            setArena('');
            setOpen(false);
            listaEquipes();
        });
    }

    function deleteEquipe(id){
        api.delete(`/equipes/${id}`).then((response) => {
            listaEquipes();
        });
    }
   

    function openEditar(id,nome,valormercado,arena){
        setBotaoAdicionar(false);
        setBotaoEditar(true);
        setOpen(true);
        setNome(nome);
        setValormercado(valormercado);
        setArena(arena);
        setId(id);
        
    }

    function editar(){
        api.put(`/equipes/${id}`,{nome:nome,valormercado:valormercado,arena:arena}).then((response) => {
            setOpen(false);
            setNome('');
            setValormercado('');
            setArena('');
            setId('');
            listaEquipes();
        });
    }
    return (
        <>
         <Header />
         <Container maxWidth="lg" className="container"> 
            <Table>
                
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Nome</TableCell>
                        <TableCell>Valor Mercado</TableCell>
                        <TableCell>Arena</TableCell>
                        
                    </TableRow>
                </TableHead>
                {lista.map(itens => (
                    <TableRow key={itens.id}>
                        <TableCell>{itens.id}</TableCell>
                        <TableCell>{itens.nome}</TableCell>
                        <TableCell>{itens.valormercado}</TableCell>
                        <TableCell>{itens.arena}</TableCell>

                        <TableCell>
                            
                            &nbsp;
                            <Button 
                                color="primary"
                                variant="outlined" 
                                onClick={() => openEditar(itens.id,itens.nome,itens.valormercado,itens.arena)}
                                size="small"> 
                                Editar 
                            </Button>
                            &nbsp;
                            <Button 
                                onClick={() => deleteEquipe(itens.id)}
                                variant="outlined" 
                                size="small" 
                                color="secondary">Apagar</Button>
                        </TableCell>
                    </TableRow>
                ))}
            </Table>
            <Button 
                onClick={openModal}
                variant="contained" 
                color="primary" 
                style={{marginTop: '20px', color:'red'}}>  
                Adicionar equipes
            </Button>
         </Container>
         <Dialog open={open} onClose={closeModal} fullWidth={true} maxWidth="sm">
            <DialogTitle id="form-dialog-title">Formulário de cadastro equipe</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Digite os dados da equipe
                </DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    id="nome"
                    label="Nome da Equipe"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                />
                <TextField
                    margin="dense"
                    id="valormercado"
                    label="Valor de Mercado da Equipe"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={valormercado}
                    onChange={e => setValormercado(e.target.value)}

                />

                 <TextField
                    margin="dense"
                    id="arena"
                    label="Arena da equipe"
                    autoComplete="off"
                    type="text"
                    fullWidth
                    value={arena}
                    onChange={e => setArena(e.target.value)}

                />
                
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal} color="primary">
                    Cancelar
                </Button>
                <Button color="primary" onClick={botaoEditar ? editar : addEquipe }>
                    Salvar
                </Button>
            </DialogActions>
         </Dialog>
        </>
    )
}

export default App;