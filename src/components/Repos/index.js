import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'

import './Repo.css'

const Repos = ({ search }) => {
    const navigate = useNavigate()
    const [allRepos, setAllRepos] = useState([])

    console.log('allrepos', allRepos)
    useEffect(() => {

        const fetchRepos = async () => {
            const response = await fetch(`https://api.github.com/orgs/${search}/repos`)
            const data = await response.json()
            setAllRepos(data)
        }
        if (search) fetchRepos()

    }, [search])

    if (!allRepos.length) {
        return null
    } else {
        allRepos.sort((a, b) => {
            a.stargazers_count - b.stargazers_count
        })
    }

    //function to go to commits page when clicking repo card
    const toCommits = (repo) => {
        navigate(`/${repo.name}`)
    }

    return (
        <>
            {allRepos.map((repo) => {
                return (
                    <div key={repo.id} className='repo-card' onClick={toCommits}>
                        <h2 className='repo-title'>{repo.name}</h2>
                        <div className='repo-lang'>
                            {repo.language}
                        </div>
                        <div className='repo-desc'>
                            {repo.description}
                        </div>
                        <div className='repo-stars'> Stars
                            {repo.stargazers_count}
                        </div>
                        <div className='repo-fork'> Forks
                            {repo.forks_count}
                        </div>
                        <div className='date-created'>Created on: {new Date(repo.created_at).toLocaleDateString('en-US')}</div>
                    </div>
                )
            })}
            {/* <div>{allRepos[0].id}</div> */}
        </>

    )
}
Repos.propTypes = {
    search: PropTypes.string,
}

export default Repos
