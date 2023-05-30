import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import './Commits.css'

const Commits = () => {
    const { repoName, repoOwner } = useParams()
    console.log('name', repoName)
    console.log('owner', repoOwner)
    const [allCommits, setAllCommits] = useState()
    console.log('allcommits', allCommits)
    useEffect(() => {

        const fetchCommits = async () => {
            const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`)
            const data = await response.json()
            setAllCommits(data)
        }
        fetchCommits()


    }, [])
    if (!allCommits) return null
    return (
        <>
        {allCommits.map((commit) => {
            return (
                <div key={commit.node_id} className='commit-card'>
                    <div className='commit-message'>{commit.commit.message}</div>
                    <div className='commit-username'>
                        User: {commit.committer.login}
                    </div>
                    <div className='commit-hash'>
                        Hash: {commit.sha}
                    </div>
                    <div className='commit-date-created'>Created on: {new Date(commit.commit.author.date).toLocaleString('en-US')}</div>
                </div>
            )
        })}
        {/* <div>{allRepos[0].id}</div> */}
    </>
    )
}
export default Commits
