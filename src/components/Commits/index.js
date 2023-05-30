import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import './Commits.css'

const Commits = () => {
    const navigate = useNavigate()
    const { repoName, repoOwner } = useParams()
    const [allCommits, setAllCommits] = useState([])

    console.log('allcommits', allCommits)
    useEffect(() => {

        const fetchCommits = async () => {
            const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/commits`)
            const data = await response.json()
            setAllCommits(data)
        }
        fetchCommits()


    }, [])

    if (!allCommits) {
        return null
    } else {
        allCommits.sort((a, b) => {
            return b.commit.author.date - a.commit.author.date
        })
    }
    const backButton = () => {
        navigate(`/`)
    }

    return (
        <div className='commits-parent'>
            <button className='go-back' onClick={() => backButton()}><i className="fa-solid fa-arrow-left"></i></button>
            <h2 style={{textAlign: 'center', marginTop: '0px'}}>Commits</h2>
            {allCommits.length > 0 && allCommits.map((commit) => {
                return (
                    <div key={commit.node_id} className='commit-card'>
                        <div className='commit-message' style={{ fontWeight: 'bold' }}>{commit.commit.message}</div>
                        <div className='commit-data'>
                            {commit.author && (
                                <div className='commit-username'>
                                    User: {commit.author.login}
                                </div>
                            )}
                            <div className='commit-hash'>
                                Hash: {commit.sha}
                            </div>
                            <div className='commit-date-created'>Created on: {new Date(commit.commit.author.date).toLocaleString('en-US')}</div>
                        </div>
                    </div>
                )
            })}
            {/* <div>{allRepos[0].id}</div> */}
        </div>
    )
}
export default Commits
