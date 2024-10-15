import { Candidate } from '../interfaces/Candidate.interface';

const readCandidates = () => {
  const candidates: Candidate[] = JSON.parse(localStorage.getItem('candidates') || '[]');
  return candidates;
}

const writeCandidate = (candidate: Candidate[]) => {
    localStorage.setItem('candidates', JSON.stringify(candidate));
};

const updateCandidates = (candidate: Candidate) => {
  const savedCandidates: Candidate[] = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
  savedCandidates.push(candidate);
  localStorage.setItem('savedCandidates', JSON.stringify(savedCandidates));
}

export { readCandidates, writeCandidate, updateCandidates };