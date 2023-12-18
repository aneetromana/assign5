import "./styles.css";
import { useState } from "react";
import Country from "./components/Country";
import data from "./data/countries.json";

//compare two countries
//alphabetical
function alphaCompare(a, b) {
  return a.name.localeCompare(b.name);
}

function alphaSort(list) {
  return list.sort(alphaCompare);
}

//Population desc
function descCompare(a, b) {
  return b.population - a.population;
}

function descSort(list) {
  return list.sort(descCompare);
}

//Population asc
function ascCompare(a, b) {
  return a.population - b.population;
}

function ascSort(list) {
  return list.sort(ascCompare);
}

//shuffle
function shuffleSort(list) {
  return list.sort(randomCountry);
}

function randomCountry(a, b) {
  return Math.random() - 0.5;
}

//population
//<100M
function lessThan100M(country) {
  return country.population < 100000000;
}

//>100M
function moreThan100M(country) {
  return country.population >= 10000000;
}

//>200M
function moreThan200M(country) {
  return country.population >= 200000000;
}

//>500M
function moreThan500M(country) {
  return country.population >= 500000000;
}

//>1B
function moreThan1B(country) {
  return country.population >= 1000000000;
}

export default function App() {
  const [sortOrder, setSortOrder] = useState(">");
  const [filterOption, setFilterOption] = useState("all");

  function handleSort(e) {
    setSortOrder(e.target.value);
  }

  function handleFilter(e) {
    setFilterOption(e.target.value);
  }

  //sort by
  function sort(list) {
    if (sortOrder === "alpha") {
      return alphaSort(list);
    } else if (sortOrder === "<") {
      return ascSort(list);
    } else if (sortOrder === ">") {
      return descSort(list);
    } else if (sortOrder === "shuffle") {
      return shuffleSort(list);
    } else {
      return list;
    }
  }

  //filters:
  function filter(list) {
    if (filterOption === "all") {
      return list;
    } else if (filterOption === "Less than 100 Million") {
      return list.filter(lessThan100M);
    } else if (filterOption === "100 Million or More") {
      return list.filter(moreThan100M);
    } else if (filterOption === "200 Million or More") {
      return list.filter(moreThan200M);
    } else if (filterOption === "500 Million or More") {
      return list.filter(moreThan500M);
    } else if (filterOption === "1 Billion or More") {
      return list.filter(moreThan1B);
    } else {
      return list.filter(
        (country) => country.continent.toLowerCase() === filterOption
      );
    }
  }

  const filtered = filter(data.countries, filterOption);
  const sorted = sort(filtered, sortOrder);

  return (
    <div className="App">
      <h1>World's Largest Countries by Population</h1>
      <div className="filters">
        <label>
          Sort by:
          <select value={sortOrder} onChange={handleSort}>
            <option value=">">Population Desc</option>
            <option value="<">Population Asc</option>
            <option value="alpha">Alphabetically</option>
            <option value="shuffle">Shuffle</option>
          </select>
        </label>
        <label>
          Filters:
          <select value={filterOption} onChange={handleFilter}>
            <optgroup label="By Continent">
              <option value="all">All</option>
              <option value="asia">Asia</option>
              <option value="africa">Africa</option>
              <option value="europe">Europe</option>
              <option value="north america">North America</option>
              <option value="south america">South America</option>
            </optgroup>
            <optgroup label="By Population Size">
              <option value="Less than 100 Million">Less than 100M</option>
              <option value="100 Million or More">100M or more</option>
              <option value="200 Million or More">200M or more</option>
              <option value="500 Million or More">500M or more</option>
              <option value="1 Billion or More">1B or more</option>
            </optgroup>
          </select>
        </label>
      </div>

      <div className="countries">
        {sorted.map(function (country) {
          return <Country details={country} key={country.id} />;
        })}
      </div>
    </div>
  );
}
