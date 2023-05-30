import React, { useState, useEffect } from 'react'
import './Repo.css'

const Repos = () => {

    const [allRepos, setAllRepos] = useState([])
    console.log('allrepos', allRepos)
    useEffect(() => {

        const fetchRepos = async () => {
            const response = await fetch('https://api.github.com/orgs/Netflix/repos')
            const data = await response.json()
            setAllRepos(data)
        }
        fetchRepos()

    }, [])
    if (!allRepos.length) return null

    return (
        <>
            {allRepos.map((repo) => {
                return (
                    <div key={repo.id} className='repo-card'>
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

export default Repos
