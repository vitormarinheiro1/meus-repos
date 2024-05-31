import React, { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import { Container, Owner, Loading, BackButton } from "./styles"
import api from '../../services/api'
import { FaArrowLeft } from "react-icons/fa";


export default function Repositorio() {

    const { repositorio } = useParams();
    const [repositorioApi, setRepositorioApi] = useState({});
    const [issues, setIssues] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            const nomeRepo = repositorio

            const [repositorioData, issuesData] = await Promise.all([
                api.get(`/repos/${nomeRepo}`),
                api.get(`/repos/${nomeRepo}/issues`, {
                    params: {
                        state: "open",
                        per_page: 5
                    }
                })
            ]);

            setRepositorioApi(repositorioData.data);
            setIssues(issuesData.data);
            setLoading(false);

        }

        load();

    }, [repositorio]);

    if(loading){
        return (
            <Loading>
                <h1>Carregando...</h1>
            </Loading>
        )
    }

    return (
        <Container>
            <BackButton to="/">
                <FaArrowLeft color="#000" size={30} />
            </BackButton>


            <Owner>
                <img
                    src={repositorioApi.owner.avatar_url}
                    alt={repositorioApi.owner.login}
                />
                <h1>{repositorioApi.name}</h1>
                <p>{repositorioApi.description}</p>
            </Owner>
        </Container>
    )
}