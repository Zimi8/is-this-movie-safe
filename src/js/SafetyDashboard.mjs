import { getParam, qs } from "./utils.mjs";

export default class SafetyDashboard {
  constructor(dataSource) {
    this.movieId = getParam("id");
    this.dataSource = dataSource;
  }

  async init() {
    if (!this.movieId) {
      qs("#movieTitle").textContent = "Movie ID not found";
      return;
    }

    try {
      const movieData = await this.dataSource.getMovieDetails(this.movieId);
      this.renderGeneralDetails(movieData);

      const guideData = await this.dataSource.getParentsGuide(this.movieId);
      this.renderSeverityLevels(guideData.parentsGuide);
      this.setupSpoilerGate(guideData.parentsGuide);

    } catch (error) {
      console.error(error);
      qs("#generalRating").textContent = "Error loading movie details.";
    }
  }

renderGeneralDetails(movie) {
    qs("#movieTitle").textContent = movie.Title;
    
    const posterImg = qs("#moviePoster");
    const fallbackImg = "https://via.placeholder.com/300x450?text=No+Poster";
    posterImg.src = movie.Poster !== "N/A" ? movie.Poster : fallbackImg;
    

    posterImg.onerror = () => {
      posterImg.src = fallbackImg;
    };
    
    qs("#generalRating").textContent = `Rated ${movie.Rated} (${movie.Year}). Genre: ${movie.Genre}`;
  }

  renderSeverityLevels(guide) {
    guide.forEach(categoryData => {
      if (categoryData.severityBreakdowns && categoryData.severityBreakdowns.length > 0) {
        const highestVote = categoryData.severityBreakdowns.reduce((prev, current) => 
          (prev.voteCount > current.voteCount) ? prev : current
        );
        
        const severityStr = highestVote.severityLevel; 
        
        // the categories! "none", "mild", "moderate", "severe"
        const categoryMapping = {
          "SEXUAL_CONTENT": "Sex & Nudity",
          "VIOLENCE": "Violence & Gore",
          "PROFANITY": "Profanity",
          "ALCOHOL_DRUGS": "Alcohol, Drugs & Smoking",
          "FRIGHTENING_INTENSE_SCENES": "Frightening & Intense Scenes"
        };

        const friendlyName = categoryMapping[categoryData.category];
        
        const listContainer = qs(".severity-list");
        if (listContainer.children.length === 5 && friendlyName === "Sex & Nudity") {
           listContainer.innerHTML = ""; 
        }

        const li = document.createElement("li");
        li.className = `severity-${severityStr}`;
        li.innerHTML = `<span class="label">${friendlyName}:</span> <span class="value" style="text-transform: capitalize;">${severityStr}</span>`;
        listContainer.appendChild(li);
      }
    });
  }

  setupSpoilerGate(guide) {
    const detailsBtn = qs("#showDetailsBtn");
    const modal = qs("#spoilerModal");
    const acceptBtn = qs("#acceptSpoilers");
    const detailsSection = qs("#literalDetails");

    detailsBtn.addEventListener("click", () => {
      modal.classList.remove("hidden");
    });

    acceptBtn.addEventListener("click", () => {
      modal.classList.add("hidden");
      detailsSection.classList.remove("hidden");
      this.renderLiteralDetails(guide);
      
      setTimeout(() => detailsSection.scrollIntoView({ behavior: "smooth" }), 100);
    });
  }

  renderLiteralDetails(guide) {
    
    const fillDetail = (categoryId, elementId) => {
      const category = guide.find(g => g.category === categoryId);
      const textContainer = qs(elementId);
      
      if (category && category.reviews && category.reviews.length > 0) {
        textContainer.textContent = category.reviews[0].text;
      } else {
        textContainer.textContent = "No detailed information available for this category.";
      }
    };

    fillDetail("VIOLENCE", "#violenceDetails");
    fillDetail("ALCOHOL_DRUGS", "#drugsDetails");
    fillDetail("SEXUAL_CONTENT", "#adultDetails");
  }
}