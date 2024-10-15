import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

const removeCandidate = (id: number) => {
  const updatedCandidates = savedCandidates.filter(candidate => candidate.id !== id);
  setSavedCandidates(updatedCandidates);
  localStorage.setItem('savedCandidates', JSON.stringify(updatedCandidates));
}


  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {savedCandidates.map((savedCandidate, idx) => (
            <tr key={idx}>
              <td><img src={savedCandidate.avatar_url} alt={`${savedCandidate.login}'s avatar`} width="50" /></td>
              <td>{savedCandidate.login}</td>
              <td>{savedCandidate.location || 'N/A'}</td>
              <td>{savedCandidate.email || 'N/A'}</td>
              <td>{savedCandidate.company || 'N/A'}</td>
              <td>
                  <button
                    onClick={() => removeCandidate(savedCandidate.id)}
                    style={{
                      backgroundColor: 'red',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      padding: '0.5em 1em',
                      cursor: 'pointer',
                    }}
                  >
                    Remove
                  </button>
                </td>
            </tr>
          ))}
        </tbody>
      </table>
      ) : (
        <p>No candidates have been accepted</p>
      )}
    </div>
  );
};

export default SavedCandidates;