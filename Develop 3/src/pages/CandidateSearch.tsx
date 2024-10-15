import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import { Candidate } from "../interfaces/Candidate.interface";
import { updateCandidates } from "../utilities/LocalStorage";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [candidate, setCandidate] = useState<Candidate>({} as Candidate);
  const [index, setIndex] = useState(0);

  const fetchCandidates = async () => {
    const data = await searchGithub();
    setCandidates(data);
    setIndex(0);
  };

  useEffect(() => {
    fetchCandidates();
  }, []);

  const nextCandidate = () => {
    if (index < candidates.length - 1) {
      setIndex(index + 1);
    } else {
      fetchCandidates();
    }
  };

  const addCandidate = () => {
    updateCandidates(candidate);
    nextCandidate();
  };

  useEffect(() => {
    const fetchCandidate = async () => {
      if (candidates.length > 0 && candidates[index]) {
        const githubUser = candidates[index].login;
        if (githubUser) {
          try {
            const data = await searchGithubUser(githubUser);
            setCandidate(data);
          } catch (error) {
            console.error("Error fetching candidate details:", error);
            nextCandidate();
          }
        } else {
          nextCandidate();
        }
      }
    };
    fetchCandidate();
  }, [candidates, index]);

  if (candidates.length === 0 || !candidates[index]) {
    return <h1>No Candidates Available</h1>;
  } else {
    const candidate = candidates[index];
    return (
      <>
        <h1>Candidate Search</h1>
        <div className="card">
          <img
            src={candidate.avatar_url || "N/A"}
            alt={`${candidate.login}'s avatar`}
          />
          <h2>{candidate.login || "N/A"}</h2>
          <p>Location: {candidate.location || "N/A"}</p>
          <p>Email: {candidate.email || "N/A"}</p>
          <p>Company: {candidate.company || "N/A"}</p>
          <p>Bio: {candidate.bio || "N/A"}</p>
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={nextCandidate}
              style={{
                backgroundColor: "red",
                color: "black",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                border: "none",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                lineHeight: "0", // Ensure text is centered
                marginRight: "300px", // Add margin to separate the buttons
              }}
            >
              &minus;
            </button>
            <button
              onClick={addCandidate}
              style={{
                backgroundColor: "green",
                color: "black",
                borderRadius: "50%",
                width: "60px",
                height: "60px",
                border: "none",
                fontSize: "24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                lineHeight: "0", // Ensure text is centered
              }}
            >
              &#43;
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default CandidateSearch;
