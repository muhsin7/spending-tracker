import { useState } from "react";

export default function AchievementsSortBy(props) {
  const [sortBy, setSortBy] = useState("Name (a -> z)");
  const SORT_BY_OPTIONS = [
    "Name (a -> z)",
    "Name (z -> a)",
    "EXP (lowest first)",
    "EXP (highest first)",
    "Obtained (earliest first)",
    "Obtained (latest first)",
  ];

  function ascendingCompare(A, B) {
    if (A === B) {
      return 0;
    } else {
      return A < B ? -1 : 1;
    }
  }

  function descendingCompare(A, B) {
    if (A === B) {
      return 0;
    } else {
      return A > B ? -1 : 1;
    }
  }

  function aTitleFirst() {
    props.setAchievements([
      ...props.achievements.sort((a, b) => ascendingCompare(a.title, b.title)),
    ]);

    props.setDefaultAchievements([
      ...props.defaultAchievements.sort((a, b) => ascendingCompare(a.title, b.title)),
    ]);
  }

  function zTitleFirst() {
    props.setAchievements([
      ...props.achievements.sort((a, b) => descendingCompare(a.title, b.title)),
    ]);
    
    props.setDefaultAchievements([
      ...props.defaultAchievements.sort((a, b) => descendingCompare(a.title, b.title)),
    ]);
  }

  function lowestExpFirst() {
    props.setAchievements([
      ...props.achievements.sort((a, b) => ascendingCompare(a.exp, b.exp)),
    ]);

    props.setDefaultAchievements([
      ...props.defaultAchievements.sort((a, b) => ascendingCompare(a.exp, b.exp)),
    ]);
  }

  function highestExpFirst() {
    props.setAchievements([
      ...props.achievements.sort((a, b) => descendingCompare(a.exp, b.exp)),
    ]);

    props.setDefaultAchievements([
      ...props.defaultAchievements.sort((a, b) => descendingCompare(a.exp, b.exp)),
    ]);
  }

  function earliestDateFirst() {
    props.setAchievements([
      ...props.achievements.sort((a, b) =>
        ascendingCompare(
          new Date(Date.parse(a.date)),
          new Date(Date.parse(b.date))
        )
      ),
    ]);

    props.setDefaultAchievements([
      ...props.defaultAchievements.sort((a, b) =>
        ascendingCompare(
          new Date(Date.parse(a.date)),
          new Date(Date.parse(b.date))
        )
      ),
    ]);
  }

  function latestDateFirst() {
    props.setAchievements([
      ...props.achievements.sort((a, b) =>
        descendingCompare(
          new Date(Date.parse(a.date)),
          new Date(Date.parse(b.date))
        )
      ),
    ]);

    props.setDefaultAchievements([
      ...props.defaultAchievements.sort((a, b) =>
        descendingCompare(
          new Date(Date.parse(a.date)),
          new Date(Date.parse(b.date))
        )
      ),
    ]);
  }

  function confirmSortBy(e) {
    setSortBy(e.target.value);
    switch (e.target.value) {
      case "Name (a -> z)":
        aTitleFirst();
        break;
      case "Name (z -> a)":
        zTitleFirst();
        break;
      case "EXP (lowest first)":
        lowestExpFirst();
        break;
      case "EXP (highest first)":
        highestExpFirst();
        break;
      case "Obtained (earliest first)":
        earliestDateFirst();
        break;
      case "Obtained (latest first)":
        latestDateFirst();
        break;
      default:
        console.log("ERROR");
        break;
    }
  }

  return (
    <div className="achievements-sort-by-section">
      <span className="achievements-sort-by-text">Sort by:</span>
      <select
        className="achievements-sort-by"
        value={sortBy}
        onChange={(e) => confirmSortBy(e)}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}
