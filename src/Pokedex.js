import React, { useState, useEffect } from "react";
import "./Pokedex.css";

function Pokedex() {
  const [pokemonName, setPokemonName] = useState("");
  const [pokemonData, setPokemonData] = useState(null);
  const [flavorText, setFlavorText] = useState("");

  const handleInputChange = (event) => {
    setPokemonName(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (pokemonName) {
      const lowercasePokemonName = pokemonName.toLowerCase();
      try {
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${lowercasePokemonName}`
        );
        if (response.ok) {
          const data = await response.json();
          setPokemonData(data);
          fetchFlavorText(data.id);
        } else {
          console.error("Error fetching Pokemon data");
        }
      } catch (error) {
        console.error("Error fetching Pokemon data:", error);
      }
    }
  };

  const fetchFlavorText = async (pokemonId) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon-species/${pokemonId}`
      );
      if (response.ok) {
        const data = await response.json();
        const englishFlavorTexts = data.flavor_text_entries
          .filter((entry) => entry.language.name === "en")
          .map((entry) => entry.flavor_text);
        if (englishFlavorTexts.length > 0) {
          const randomIndex = Math.floor(
            Math.random() * englishFlavorTexts.length
          );
          const randomFlavorText = englishFlavorTexts[randomIndex];
          setFlavorText(randomFlavorText);
        }
      } else {
        console.error("Error fetching flavor text");
      }
    } catch (error) {
      console.error("Error fetching flavor text:", error);
    }
  };

  const fetchTypeData = async (typeName) => {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/type/${typeName}`
      );
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error fetching type data");
        return null;
      }
    } catch (error) {
      console.error("Error fetching type data:", error);
      return null;
    }
  };

  const fetchWeaknesses = async () => {
    if (pokemonData && pokemonData.types) {
      const weaknesses = [];
      for (const type of pokemonData.types) {
        const typeData = await fetchTypeData(type.type.name);
        if (typeData) {
          const doubleDamageFrom = typeData.damage_relations.double_damage_from;
          doubleDamageFrom.forEach((weakness) => {
            if (!weaknesses.includes(weakness.name)) {
              weaknesses.push(weakness.name);
            }
          });
        }
      }
      return weaknesses;
    }
    return [];
  };

  useEffect(() => {
    const fetchData = async () => {
      if (pokemonName) {
        try {
          const response = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pokemonName}`
          );
          if (response.ok) {
            const data = await response.json();
            setPokemonData(data);
          } else {
            console.error("Error fetching Pokemon data");
          }
        } catch (error) {
          console.error("Error fetching Pokemon data:", error);
        }
      }
    };

    fetchData();
  }, [pokemonName]);

  useEffect(() => {
    const loadWeaknesses = async () => {
      const weaknesses = await fetchWeaknesses();
      console.log(weaknesses);
    };

    loadWeaknesses();
  }, [pokemonData]);

  return (
    <section className="pokedex">
      <form className="pokedex__search" onSubmit={handleSubmit}>
        <input
          className="pokedex__searchbar"
          placeholder="Enter Pokemon Name"
          value={pokemonName}
          onChange={handleInputChange}
        />
        <input className="pokedex__submit" type="submit" value="Search" />
      </form>

      {pokemonData && (
        <div className="pokedex__result">
          <span className="pokedex__title">
            <h1 className="pokedex__name">{pokemonData.name}</h1>
            <p className="pokedex__number">#{pokemonData.id}</p>
          </span>

          <section className="pokedex__wrapper">
            <div className="pokedex__left">
              <img
                src={pokemonData.sprites.front_default}
                alt={pokemonData.name}
                className="pokedex__image"
              />

              <div className="pokedex__stats">Stats</div>
            </div>

            <div className="pokedex__right">
              <p className="pokedex__description">{flavorText}</p>

              <div className="pokedex__versions">
                <p className="pokedex__versionsTitle">Versions:</p>
                <i className="fa-solid fa-mars pokedex__male pokedex__gender"></i>
                <i className="fa-solid fa-venus pokedex__female"></i>
              </div>

              <div className="pokedex__info">
                <div className="pokedex__info--left">
                  <span className="pokedex__infotext">
                    <p className="pokedex__subtitle">Height</p>
                    <p className="pokedex__infographic">
                      {pokemonData.height / 10} m
                    </p>
                  </span>

                  <span className="pokedex__infotext">
                    <p className="pokedex__subtitle">Weight</p>
                    <p className="pokedex__infographic">
                      {pokemonData.weight / 10} kg
                    </p>
                  </span>

                  <span className="pokedex__infotext">
                    <p className="pokedex__subtitle">Gender</p>
                    <div className="pokedex__infogenders">
                      <i className="fa-solid fa-mars pokedex__infogenders--male"></i>
                      <i className="fa-solid fa-venus pokedex__infogenders--female"></i>
                    </div>
                  </span>
                </div>

                <div className="pokedex__info--right">
                  <span className="pokedex__infotext">
                    <p className="pokedex__subtitle">Category</p>
                    <p className="pokedex__infographic">
                      {pokemonData.types && pokemonData.types[0]
                        ? pokemonData.types[0].type.name
                        : ""}
                    </p>
                  </span>

                  <span className="pokedex__infotext">
                    <p className="pokedex__subtitle">Abilities</p>
                    {pokemonData.abilities && (
                      <div>
                        {pokemonData.abilities.map((ability, index) => (
                          <p className="pokedex__infographic" key={index}>
                            {ability.ability.name}
                          </p>
                        ))}
                      </div>
                    )}
                  </span>
                </div>
              </div>

              <div className="pokedex__labels">
                <p className="pokedex__labeltitle">Type</p>
                <div className="pokedex__types">
                  {pokemonData.types &&
                    pokemonData.types.map((type, index) => (
                      <span
                        className={`pokedex__label pokedex__label--${type.type.name}`}
                        key={index}
                      >
                        {type.type.name}
                      </span>
                    ))}
                </div>

                <p className="pokedex__labeltitle">Weaknesses</p>
                <div className="pokedex__weaknesses">
                  <span className="pokedex__label pokedex__label--psychic">
                    Psychic
                  </span>
                  <span className="pokedex__label pokedex__label--fighting">
                    Fighting
                  </span>
                  <span className="pokedex__label pokedex__label--fairy">
                    Fairy
                  </span>
                  <span className="pokedex__label pokedex__label--electric">
                    Electric
                  </span>
                  <span className="pokedex__label pokedex__label--ice">
                    Ice
                  </span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </section>
  );
}

export default Pokedex;
