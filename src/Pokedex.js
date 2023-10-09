import "./Pokedex.css";

function Pokedex() {
  return (
    <section class="pokedex">
      <form class="pokedex__search">
        <input class="pokedex__searchbar" placeholder="Pikachu"></input>
        <input class="pokedex__submit" type="submit" value="Search"></input>
      </form>

      <span class="pokedex__title">
        <h1 class="pokedex__name">Flamingo</h1>
        <p class="pokedex__number">#0937</p>
      </span>

      <section class="pokedex__wrapper">
        <div class="pokedex__left">
          <img
            src="https://assets.pokemon.com/assets/cms2/img/pokedex/full/973.png"
            alt="Flamingo Pokemon"
            class="pokedex__image"
          />

          <div class="pokedex__stats">Stats</div>
        </div>

        <div class="pokedex__right">
          <p class="pokedex__description">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            delectus explicabo dicta quam adipisci, nulla similique, cupiditate,
            ex nisi voluptates aliquid. Officia provident amet, quos quaerat
            itaque cum voluptatem dolor?
          </p>

          <div class="pokedex__versions">
            <p class="pokedex__versionsTitle">Versions:</p>
            <i class="fa-solid fa-mars pokedex__male pokedex__gender"></i>
            <i class="fa-solid fa-venus pokedex__female"></i>
          </div>

          <div class="pokedex__info">
            <div class="pokedex__info--left">
              <span class="pokedex__infotext">
                <p class="pokedex__subtitle">Height</p>
                <p class="pokedex__infographic">5' 03"</p>
              </span>

              <span class="pokedex__infotext">
                <p class="pokedex__subtitle">Weight</p>
                <p class="pokedex__infographic">81.6lbs</p>
              </span>

              <span class="pokedex__infotext">
                <p class="pokedex__subtitle">Gender</p>
                <div class="pokedex__infogenders">
                  <i class="fa-solid fa-mars pokedex__infogenders--male"></i>
                  <i class="fa-solid fa-venus pokedex__infogenders--female"></i>
                </div>
              </span>
            </div>

            <div class="pokedex__info--right">
              <span class="pokedex__infotext">
                <p class="pokedex__subtitle">Category</p>
                <p class="pokedex__infographic">Synchronize</p>
              </span>

              <span class="pokedex__infotext">
                <p class="pokedex__subtitle">Abilities</p>
                <p class="pokedex__infographic">Tangled Feet</p>
                <p class="pokedex__infographic">Scrappy</p>
              </span>
            </div>
          </div>

          <div class="pokedex__labels">
            <p class="pokedex__labeltitle">Type</p>
            <div class="pokedex__types">
              <span class="pokedex__label">Flying</span>
              <span class="pokedex__label">Fighting</span>
            </div>

            <p class="pokedex__labeltitle">Weaknesses</p>
            <div class="pokedex__weaknesses">
              <span class="pokedex__label">Psychic</span>
              <span class="pokedex__label">Fighting</span>
              <span class="pokedex__label">Fairy</span>
              <span class="pokedex__label">Electric</span>
              <span class="pokedex__label">Ice</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Pokedex;
