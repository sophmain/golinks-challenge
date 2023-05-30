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
            return b.stargazers_count - a.stargazers_count
        })
    }

    //function to go to commits page when clicking repo card
    const toCommits = (repo) => {
        navigate(`/${repo.full_name}`)
    }

    return (
        <>
            {allRepos.map((repo) => {
                return (
                    <div key={repo.id} className='repo-card' onClick={() => toCommits(repo)}>
                        <h2 className='repo-title'>{repo.name}</h2>
                        <div className='repo-info-parent'>
                            <div className='lang-desc-container'>
                                {repo.language && (
                                    <div className='repo-lang'> Language:
                                        {repo.language}
                                    </div>
                                )}
                                {repo.description && (
                                    <div className='repo-desc'>
                                        <span>{repo.description}</span>
                                    </div>
                                )}
                            </div>
                            <div className='repo-data-container'>
                                <div className='repo-stars'>
                                    {repo.stargazers_count} <i className="fa-solid fa-star"></i>
                                </div>
                                <div className='repo-fork'>
                                    {repo.forks_count} <i className="fa-solid fa-code-fork"></i>
                                </div>
                                <div className='date-created'>Created on: {new Date(repo.created_at).toLocaleDateString('en-US')}</div>
                            </div>
                        </div>
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
