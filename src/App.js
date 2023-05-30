import { useEffect, useState } from 'react';
import Repos from './components/Repos'
import Commits from './components/Commits'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'

function App() {
  const [search, setSearch] = useState(localStorage.getItem("search") || "");

  useEffect(()=> {
    localStorage.setItem('search', search)
  }, [search])

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Router>
      <div>
        <h1>Search for GitHub organization</h1>
        <div>
          <div>
            <form>
              <div className='search-box'>
                <label htmlFor="githubOrgSearch" hidden>
                  Search for GitHub organization
                </label>
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  type="text"
                  className="form-control"
                  id="githubOrgSearch"
                  aria-describedby="githubOrgSearch"
                  placeholder="Search for a GitHub Organization"
                />
              </div>
              <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
                SEARCH
              </button>
            </form>
          </div>
        </div>
        <Routes>
          <Route exact path = '/' element={<Repos search = {search} />} />
          <Route exact path = '/:repoOwner/:repoName' element ={<Commits />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
