import React, { useState, useCallback } from 'react';
import { FaGithub, FaPlus, FaSpinner } from 'react-icons/fa';
import { Container, Form, SubmitButton } from '../../styles';

import api from '../../services/api';

export default function Main() {

    const [newRepo, setNewRepo] = useState('');
    const [repositorios, setRepositorios] = useState('');
    const [loading, setLoading] = useState(false);

    function handleinputChange(e) {
        setNewRepo(e.target.value);
    }

    const handleSubmit = useCallback((e) => {
        e.preventDefault(); //// NAO DA REFRESH NA PAGINA AO CLICAR NO BOTAO

        async function submit() {
            setLoading(true);
            try{
                const response = await api.get(`repos/${newRepo}`);

                const data = {
                    name: response.data.full_name,
                }
    
                setRepositorios([...repositorios, data]);
                setNewRepo('');
            }catch(error){
                console.log(error);
            }finally{
                setLoading(false);
            }

        }

        submit();
    }, [newRepo, repositorios]);

    return (
        <Container>
            <h1>
                <FaGithub size={25} />
                Meus Repositórios
            </h1>

            <Form onSubmit={handleSubmit} >
                <input
                    type="text"
                    placeholder='Adicionar Repositórios'
                    value={newRepo}
                    onChange={handleinputChange}
                />

                <SubmitButton loading={loading ? 1 : 0}>
                    {loading ? (
                        <FaSpinner color='#FFF' size={14} />
                    ) : (
                        <FaPlus size={14} color='#FFF' />
                    )}                   
                </SubmitButton>
            </Form>
        </Container>

    )
}