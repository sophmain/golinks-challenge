import { useState } from 'react';
import Repos from './components/Repos'
import Commits from './components/Commits'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [search, setSearch] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <Router>
      <div>
        <h1>Search for a GitHub organization</h1>
        <div>
          <div>
            <form>
              <div>
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
                Search
              </button>
            </form>
          </div>
        </div>
        <Routes>
          <Route exact path = '/' element={<Repos search = {search} />} />
          <Route exact path = '/:repoName' element ={<Commits />} />

        </Routes>
        {/* <Repos search={search} /> */}
        {/* < Route exact path='/:name'>
        <Commits />
      </Route> */}
      </div>
    </Router>
  );
}

export default App;
