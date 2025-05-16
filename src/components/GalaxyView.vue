<template>
  <div>
    <div class="galaxy-container" :style="{ backgroundImage: `url(${backgroundImage})` }">
      <div class="stars"></div>
      <div class="nebula"></div>
      <div class="galaxy-core"></div>
      
      <div class="content-wrapper">
        <!-- Contenu principal -->
        <div class="main-content">

          <h1 class="funkthetown-title">Funkthetown</h1>
          <h1>Utopia</h1>
          
          <div class="text-content">
            <h1 class="main-title">Work In Progress</h1>
            
            <div class="mission-section">
              
              <p class="mission-text">
                Nous créons un écosystème créatif qui démocratise et décentralise la culture musicale grâce aux technologies de demain et ainsi créer un nouveau paradigme pour l'industrie musicale en développant une infrastructure distribuée basée sur Holochain, qui permet  aux artistes et aux auditeurs d'interagir directement, sans intermédiaires.
   Notre organisation s'articule autour d'un Groupement d'Intérêt Economique qui fait office de hub via le domaine funkthetown.net, où chacun peut participer et contribuer . Ensemble, nous construisons un modèle alternatif où la musique circule librement sous licences Creative Commons, où la valeur est équitablement répartie, et où il n'y a pas de jeux de pouvoir.
   Funkthetown n'est pas seulement un diffuseur de culture, mais un instigateur de l'évolution musicale décentralisée qui donne ainsi la creation aux inspirants et aux inspirés.
              </p>
            </div>

            <div class="universe-section">
              <h2 class="universe-title">Notre Galaxie</h2>
              <p class="universe-text">
                Chaque planète est un intervenant de la galaxie Funkthetown.
              </p>
            </div>
          </div>
        </div>

        <!-- Planètes -->
        <div class="planets-section">
          <!-- Le centre de la galaxie est maintenant représenté par la planète centrale -->
          
          <div class="planets-container" v-if="showPlanets">
            <div class="spiral-arms-indicator"></div>
            <div v-for="(planet, index) in planets" 
                :key="index" 
                class="planet"
                :class="planet.class"
                :style="getPlanetStyle(index)"
                @click="navigateTo(planet.route)"
                tabindex="0"
                @keypress.enter="navigateTo(planet.route)"
                :title="planet.name + ' - ' + planet.description">
              
              <!-- Simple contenu avec l'initiale au cas où l'image ne chargera pas -->
              <div class="planet-fallback">{{ planet.name[0] }}</div>
              
              <!-- Info-bulle de description -->
              <div class="planet-info">
                <h3>{{ planet.name }}</h3>
                <p>{{ planet.description }}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div class="content-wrapper bottom-content">
          <div class="main-content">
            <div class="fonctionnement-section">
              <h2 class="fonctionnement-title">Notre fonctionnement est ouvert</h2>
              <p class="fonctionnement-text">
                Artistocratie, hétérarchie ou adhocratie : voici des termes qui collent à notre schéma fonctionnel. Si notre vision vous inspire... travaillons ensemble.
                <br><br>
                Que vous souhaitiez coopérer dans l'une de nos activités : production sonore, design, développement web, communication, investissement ou création sous quelque forme que ce soit... twister-nous avec un CV et une création/travail dont vous êtes fier ou tout simplement ce que vous voulez partager.
                Si vous êtes une une organisation – association, institution, entreprise ou collectif et que vous souhaitez ouvrir un partenariat: c'est aussi ici que ça se passe.<br><br>
                <a href="mailto:affaires@funkthetown.net" class="fonctionnement-mail">affaires@funkthetown.net</a>
              </p>
            </div>
          </div>
        </div>
      </div>

      <footer class="credit-footer">
      <span>
        Design & Développement : l'équipe Funkthetown 2025<br>
        <a href="https://creativecommons.org/licenses/by-sa/4.0/deed.fr" target="_blank" rel="noopener" class="cc-link">
          <img src="https://mirrors.creativecommons.org/presskit/icons/cc.svg" alt="CC" style="height:1em;vertical-align:middle;"> 
          <img src="https://mirrors.creativecommons.org/presskit/icons/by.svg" alt="BY" style="height:1em;vertical-align:middle;"> 
          <img src="https://mirrors.creativecommons.org/presskit/icons/sa.svg" alt="SA" style="height:1em;vertical-align:middle;"> 
          CC BY-SA Creative Commons
        </a>
      </span>
    </footer>
    </div>

   
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

// Importation de l'image de fond
import backgroundImage from '../assets/ESOPEWEBPAGE.jpg'
// Importation directe des images problématiques
import logoFTTR from '../assets/Visuel_Planete/LOGO_FTTR.jpg'
// Importation du logo central
import logoF2T from '../assets/Visuel_Planete/F2T_logo_color2.png'

// Animation de rotation
const rotationAngle = ref(0)
// Variables pour le mouvement et l'effet de la planète centrale
const centralMovementX = ref(0)
const centralMovementY = ref(0)
const centralScale = ref(1)
const centralGlow = ref(40) // Intensité initiale de la lueur
const centralRotation = ref(0) // Rotation de la planète centrale
const rotationSpeed = 0.2 // degrés par frame
let animationFrameId = null

// États
const showPlanets = ref(true)

// Pour déboguer les URL d'images
const debugTextures = (path) => {
  console.log('Chargement de l\'image:', path);
  return path;
}

// Planètes
const planets = ref([
  // Planète centrale (nouvelle)
  {
    name: 'Funkthetown',
    description: 'Le Hub',
    route: '/',
    class: 'planet-central',
    size: 120, // Plus grande que les autres
    orbit: 0, // Au centre
    central: true, // Marqueur pour identifier la planète centrale
    texture: logoF2T
  },
  {
    name: 'DJ Flo',
    description: "L'Esthète",
    route: 'https://djflo.funkthetown.net/',
    class: 'planet-djflo',
    size: 80,
    orbit: 1.2,
    external: true,
    texture: debugTextures(new URL('../assets/Visuel_Planete/lOGO_Avatar_DjFlo_3.jpg', import.meta.url).href)
  },
  {
    name: 'Funkthetown Recordings',
    description: 'Le Label',
    route: 'https://funkthetown-recordings.bandcamp.com/music',
    class: 'planet-radio',
    size: 95,
    orbit: 2.2,
    external: true,
    // Utilisation de l'image importée directement
    texture: logoFTTR
  },
  {
    name: 'Funkthetown Events',
    description: 'Les Events',
    route: 'https://events.funkthetown.net/',
    class: 'planet-events',
    size: 85,
    orbit: 2.6,
    external: true,
    // Utilisation d'une URL directe avec le nom correct
    texture: debugTextures(new URL('../assets/Visuel_Planete/F2TEVENTS.jpg', import.meta.url).href)
  },
  {
    name: 'Funkthetown Radio',
    description: 'La Radio',
    route: 'https://radio.funkthetown.net/',
    class: 'planet-frds',
    size: 75,
    orbit: 3.0,
    external: true,
    texture: debugTextures(new URL('../assets/Visuel_Planete/ftradio.png', import.meta.url).href)
  },
  {
    name: 'Piece de Jeux',
    description: 'Le Studio',
    route: 'https://pdj.funkthetown.net/',
    class: 'planet-piece-de-jeux',
    size: 83,
    orbit: 3.4,
    external: true,
    texture: debugTextures(new URL('../assets/Visuel_Planete/LOGO_PIECE-DE-JEUX_1.jpg', import.meta.url).href)
  },
  {
    name: 'Marw',
    description: 'Le Pygmalion',
    route: 'https://marw.funkthetown.net/',
    class: 'planet-marw',
    size: 78,
    orbit: 3.8,
    external: true,
    texture: debugTextures(new URL('../assets/Visuel_Planete/Marw.jpg', import.meta.url).href)
  },
  {
    name: 'Em Tro',
    description: 'Le Composer',
    route: 'https://emtro.funkthetown.net/',
    class: 'planet-emtro',
    size: 73,
    orbit: 4.2,
    external: true,
    // Utilisation d'une URL directe avec le nom correct
    texture: debugTextures(new URL('../assets/Visuel_Planete/Em.png', import.meta.url).href)
  },
  {
    name: 'Funkthetown Clothes',
    description: 'La Collection De Vêtements',
    route: 'https://funkthetownclothes.myspreadshop.net/',  
    class: 'planet-clothes',
    size: 88,
    orbit: 4.6,
    external: true,
    texture: debugTextures(new URL('../assets/Visuel_Planete/FKT-CLOTHES8LOGO-3.png', import.meta.url).href)
  },
  {
    name: 'A One',
    description: 'Le Designer',
    route: 'https://aone.funkthetown.net/',
    class: 'planet-aone',
    size: 76,
    orbit: 5.0,
    external: true,
    texture: debugTextures(new URL('../assets/Visuel_Planete/LOGO_AONE4.jpg', import.meta.url).href)
  },
  {
    name: 'Weather',
    description: 'Le Duo',
    route: 'https://weather.funkthetown.net/',
    class: 'planet-weather',
    size: 82,
    orbit: 5.4,
    external: true,
    texture: debugTextures(new URL('../assets/Visuel_Planete/WEATHER_TUMBNAIL_YT.png', import.meta.url).href)
  }
])

// Angle initial pour avoir une galaxie déjà formée au chargement
rotationAngle.value = 45

// Fonction d'animation pour faire tourner la galaxie
const animateGalaxy = () => {
  // Mise à jour de l'angle de rotation
  rotationAngle.value += rotationSpeed
  if (rotationAngle.value >= 360) {
    rotationAngle.value -= 360
  }
  
  // Mouvement circulaire plus prononcé pour la planète centrale
  // Amplitude de 5px pour un mouvement plus visible
  // Directement lié à l'angle de rotation pour une parfaite synchronisation
  const angleRad = rotationAngle.value * Math.PI / 180
  centralMovementX.value = Math.sin(angleRad) * 5
  centralMovementY.value = Math.cos(angleRad) * 5
  
  // Effet de rotation lente pour la planète centrale
  // Rotation 3 fois plus lente que la galaxie pour un effet de résistance
  centralRotation.value = rotationAngle.value / 3
  
  // Effet de pulsation pour la planète centrale
  // Légèrement décalé par rapport au mouvement pour un effet plus naturel
  const pulseAngle = (rotationAngle.value + 45) % 360
  centralScale.value = 0.97 + 0.06 * Math.sin(pulseAngle * Math.PI / 180)
  
  // Variation de l'intensité de la lueur
  centralGlow.value = 40 + 15 * Math.sin(pulseAngle * Math.PI / 180)
  
  // Continuer l'animation
  animationFrameId = requestAnimationFrame(animateGalaxy)
}

const getPlanetStyle = (index) => {
  const planet = planets.value[index]
  
  // Si c'est la planète centrale, elle a un traitement spécial
  if (planet.central) {
    return {
      width: `${planet.size}px`,
      height: `${planet.size}px`,
      position: 'absolute',
      backgroundImage: `url(${planet.texture})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      zIndex: 9998, // Juste en dessous des infobulles
      borderRadius: '50%',
      // Application du mouvement circulaire tout en restant au centre
      top: `calc(50% + ${centralMovementY.value}px)`,
      left: `calc(50% + ${centralMovementX.value}px)`,
      // Application de l'effet de pulsation et de rotation
      transform: `translate(-50%, -50%) scale(${centralScale.value}) rotate(${centralRotation.value}deg)`,
      border: '3px solid var(--central-color)',
      // Application de la variation de lueur
      boxShadow: `0 0 ${centralGlow.value}px var(--central-color), inset 0 0 25px var(--central-color)`
    }
  }
  
  const totalPlanets = planets.value.length - 1 // Moins la planète centrale
  
  // Paramètres de la spirale améliorés pour gérer plus de planètes
  const spiralFactor = 0.4
  const baseRadius = 150 // Augmenté pour laisser de l'espace pour la planète centrale
  const angleStep = 360 / (totalPlanets * 1.5)
  
  // Ajuster l'index pour tenir compte de la planète centrale
  const adjustedIndex = planet.central ? 0 : index - 1
  
  // Calcul de l'angle avec une animation de rotation
  const baseAngle = (Math.pow(adjustedIndex, 1.1) * angleStep) + rotationAngle.value
  
  // Calcul du rayon
  const curveFactor = 1.1
  const angleRad = baseAngle * Math.PI / 180
  const radius = baseRadius + (Math.log(adjustedIndex + 3) * 50) + (Math.pow(baseAngle, curveFactor) * spiralFactor)
  
  // Ajout d'une légère variation pour éviter l'alignement parfait
  const variationX = Math.sin(adjustedIndex * 541) * 15
  const variationY = Math.cos(adjustedIndex * 827) * 15
  
  // Conversion en coordonnées cartésiennes
  const x = (radius * Math.cos(angleRad)) + variationX
  const y = (radius * Math.sin(angleRad)) + variationY
  
  // Ajout d'un effet de profondeur
  const scale = Math.max(0.65, 0.85 - (adjustedIndex * 0.01))
  const opacity = Math.min(1, 0.75 + (adjustedIndex * 0.025))
  
  // Styles spécifiques à la planète radio (Funkthetown Recordings)
  if (planet.class === 'planet-radio') {
    return {
      width: `${planet.size}px`,
      height: `${planet.size}px`,
      left: `calc(50% + ${x}px)`,
      top: `calc(50% + ${y}px)`,
      transform: `translate(-50%, -50%) scale(${scale})`,
      backgroundImage: `url(${planet.texture})`,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: '#000',
      opacity: opacity,
      zIndex: 10 + index,
      position: 'absolute',
      border: `2px solid var(--radio-color)`,
      boxShadow: `0 0 20px var(--radio-color), inset 0 0 15px var(--radio-color)`
    }
  }
  
  // Calculer la couleur dominante pour la planète basée sur sa classe
  const planetColor = planet.class.split('-')[1] || 'rgba(255, 255, 255, 0.7)'
  
  // Style par défaut pour les autres planètes
  return {
    width: `${planet.size}px`,
    height: `${planet.size}px`,
    left: `calc(50% + ${x}px)`,
    top: `calc(50% + ${y}px)`,
    transform: `translate(-50%, -50%) scale(${scale})`,
    backgroundImage: `url(${planet.texture})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    opacity: opacity,
    zIndex: 10 + index,
    '--planet-color': `var(--${planetColor}-color, rgba(255, 255, 255, 0.7))`,
    boxShadow: `0 0 ${8 + index * 2}px var(--planet-color, rgba(255, 255, 255, 0.7))`,
    position: 'absolute'
  }
}

const navigateTo = (route) => {
  if (route.startsWith('http')) {
    window.open(route, '_blank')
  } else {
    window.location.href = route
  }
}

onUnmounted(() => {
  // Arrêter l'animation lorsque le composant est démonté
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId)
  }
})

onMounted(() => {
  // Démarrer l'animation de la galaxie
  animateGalaxy()
  
  // Préchargement des images pour éviter les problèmes d'affichage
  planets.value.forEach(planet => {
    if (planet.texture) {
      const img = new Image()
      img.src = planet.texture
      img.onload = () => console.log(`Image chargée avec succès: ${planet.name}`)
      img.onerror = () => console.error(`Erreur de chargement pour l'image: ${planet.name}`)
    }
  })
})
</script>

<style scoped>
:root {
  /* Couleurs pour les planètes */
  --central-color: rgba(255, 215, 0, 0.8); /* Couleur dorée pour la planète centrale */
  --djflo-color: rgba(220, 20, 60, 0.7);
  --radio-color: rgba(65, 105, 225, 0.7);
  --events-color: rgba(50, 205, 50, 0.7);
  --frds-color: rgba(255, 165, 0, 0.7);
  --piece-de-jeux-color: rgba(138, 43, 226, 0.7);
  --marw-color: rgba(255, 215, 0, 0.7);
  --emtro-color: rgba(70, 130, 180, 0.7);
  --clothes-color: rgba(220, 80, 150, 0.7);
  --aone-color: rgba(46, 204, 113, 0.7);
  --weather-color: rgba(155, 89, 182, 0.7);
}

@font-face {
  font-family: 'ARLRDBD';
  src: url('../../css/ARLRDBD.woff') format('truetype');
  font-weight: normal;
  font-style: normal;
}

.funkthetown-title {
  font-size: 3em;
  color: #ffd700;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'ARLRDBD', Arial, sans-serif;
  letter-spacing: 1px;

}

.galaxy-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}

.galaxy-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 0;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  padding: 20px;
  font-family: 'ARLRDBD', Arial, sans-serif;
}

.main-content {
  position: relative;
  z-index: 1;
}

.logo-img {
  width: 200px;
  margin-bottom: 30px;
}

.main-title {
  font-size: 3em;
  margin-bottom: 20px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
  font-family: 'ARLRDBD', Arial, sans-serif;
  letter-spacing: 1px;
  color: #fff;
}

.mission-section {
  
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
 
}

.mission-title {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #ffd700;
  font-family: 'ARLRDBD', Arial, sans-serif;
}

.mission-text {
  font-size: 1.5em;
  line-height: 1.6;
  font-family: 'ARLRDBD', Arial, sans-serif;
}

.universe-section {
 
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;

}

.universe-title {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #ffd700;
  font-family: 'ARLRDBD', Arial, sans-serif;
}

.universe-text {
  font-size: 1.5em;
  line-height: 1.6;
}

.fonctionnement-section {
  
  padding: 20px;
  border-radius: 10px;
  margin-top: 20px;
  width: 100%;
  
}

.fonctionnement-title {
  font-size: 1.5em;
  margin-bottom: 15px;
  color: #ffd700;
  font-family: 'ARLRDBD', Arial, sans-serif;
}

.fonctionnement-text {
  font-size: 1.5em;
  line-height: 1.6;
}

.fonctionnement-mail {
  color: #fff;
  font-weight: bold;
  text-decoration: none;
 
}

.credit-footer {
  width: 100%;
  text-align: center;
  padding: 1.5rem 0 1rem 0;
  color: #fff;
  font-size: 1rem;
  opacity: 0.8;
  letter-spacing: 0.03em;
 
  
  position: relative;
  z-index: 10;
}

.cc-link {
  color: #fff;
  text-decoration: none;
  opacity: 0.9;
  margin-left: 0.3em;
}

.cc-link:hover {
  opacity: 1;
}

/* Effet étoiles */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background: rgba(0, 0, 0, 0.5);
}

/* Animations d'étoiles scintillantes avec différentes durées */
@keyframes twinkle-fast {
  0% { opacity: 0.3; }
  50% { opacity: 1; }
  100% { opacity: 0.3; }
}

@keyframes twinkle-med {
  0% { opacity: 0.5; }
  50% { opacity: 0.9; }
  100% { opacity: 0.5; }
}

@keyframes twinkle-slow {
  0% { opacity: 0.6; }
  50% { opacity: 0.8; }
  100% { opacity: 0.6; }
}

/* Couches multiples d'étoiles avec des tailles et positions variées */
.stars::before,
.stars::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 10% 10%, white, transparent),
    radial-gradient(1px 1px at 20% 20%, white, transparent),
    radial-gradient(1px 1px at 30% 30%, white, transparent),
    radial-gradient(1px 1px at 40% 40%, white, transparent),
    radial-gradient(1px 1px at 50% 50%, white, transparent),
    radial-gradient(1px 1px at 60% 60%, white, transparent),
    radial-gradient(1px 1px at 70% 70%, white, transparent),
    radial-gradient(2px 2px at 80% 80%, white, transparent),
    radial-gradient(2px 2px at 90% 90%, white, transparent);
  background-size: 150px 150px;
  animation: twinkle-fast 3s infinite alternate;
}

.stars::after {
  background-size: 200px 200px;
  background-position: 50px 50px;
  background-image: 
    radial-gradient(2px 2px at 15% 15%, white, transparent),
    radial-gradient(2px 2px at 25% 25%, white, transparent),
    radial-gradient(2px 2px at 35% 35%, white, transparent),
    radial-gradient(1px 1px at 45% 45%, rgba(255, 200, 200, 0.8), transparent),
    radial-gradient(1px 1px at 55% 55%, rgba(200, 200, 255, 0.8), transparent),
    radial-gradient(1px 1px at 65% 65%, white, transparent),
    radial-gradient(1px 1px at 75% 75%, white, transparent),
    radial-gradient(3px 3px at 85% 85%, white, transparent),
    radial-gradient(2px 2px at 95% 95%, white, transparent);
  animation: twinkle-med 4s infinite alternate;
  animation-delay: 1s;
  opacity: 0.7;
}

/* Ajout d'une troisième couche d'étoiles plus lointaines */
.stars::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: 
    radial-gradient(1px 1px at 5% 5%, white, transparent),
    radial-gradient(1px 1px at 15% 15%, white, transparent),
    radial-gradient(1.5px 1.5px at 25% 25%, white, transparent),
    radial-gradient(1px 1px at 35% 35%, white, transparent),
    radial-gradient(1.5px 1.5px at 45% 45%, white, transparent),
    radial-gradient(1px 1px at 55% 55%, white, transparent),
    radial-gradient(1.5px 1.5px at 65% 65%, white, transparent),
    radial-gradient(1px 1px at 75% 75%, white, transparent),
    radial-gradient(2px 2px at 85% 85%, white, transparent),
    radial-gradient(1px 1px at 95% 95%, white, transparent);
  background-size: 250px 250px;
  background-position: 25px 25px;
  animation: twinkle-slow 5s infinite alternate;
  animation-delay: 2s;
  opacity: 0.5;
}

/* Spirales de nébuleuse galactique */
.nebula {
  position: absolute;
  width: 100%;
  height: 100%;
  background: 
    /* Effet de bulbe central plus brillant */
    radial-gradient(circle at 50% 50%, rgba(255, 220, 150, 0.15), transparent 20%),
    
    /* Bras spiraux 1 */
    conic-gradient(
      from 45deg at 50% 50%,
      transparent,
      rgba(100, 50, 255, 0.1),
      rgba(255, 100, 50, 0.1),
      rgba(100, 50, 255, 0.05),
      transparent 270deg
    ),
    
    /* Bras spiraux 2 - décalé de 90 degrés */
    conic-gradient(
      from 135deg at 50% 50%,
      transparent,
      rgba(50, 100, 255, 0.1),
      rgba(255, 150, 50, 0.1),
      rgba(50, 100, 255, 0.05),
      transparent 270deg
    ),
    
    /* Poudre d'étoiles diffuse */
    radial-gradient(ellipse at 50% 50%, rgba(255, 255, 220, 0.1), transparent 70%);
    
  filter: blur(10px);
  z-index: 0;
  pointer-events: none;
  opacity: 0.8;
  
  /* Animation de rotation lente pour la nébuleuse */
  animation: rotate-nebula 180s linear infinite;
}

@keyframes rotate-nebula {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Styles pour les planètes */
.planets-section {
  position: relative;
  width: 100%;
  height: 80vh; /* Augmenté pour donner plus d'espace */
  margin-top: 2rem;
  margin-bottom: 2rem; /* Ajouté pour donner plus d'espace en bas */
  overflow: visible; /* Assurez-vous que c'est "visible" */
  perspective: 1000px;
  z-index: 2;
}

.planets-container {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible; /* Changé de "visible" à "visible" pour garantir que les info-bulles ne sont pas coupées */
  transform-style: preserve-3d;
}

/* Bulbe central de la galaxie */
.galaxy-core {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(
    circle at center,
    rgba(255, 240, 180, 0.4) 0%,
    rgba(255, 210, 130, 0.3) 30%,
    rgba(255, 180, 100, 0.2) 60%,
    rgba(255, 150, 80, 0.1) 80%,
    transparent 100%
  );
  box-shadow: 0 0 60px rgba(255, 200, 100, 0.5);
  z-index: 2;
  filter: blur(5px);
  animation: pulse-core 6s infinite alternate;
}

/* Centre de la galaxie - un point brillant */
.galaxy-center {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 200, 0.9);
  box-shadow: 0 0 15px 5px rgba(255, 255, 200, 0.8),
              0 0 30px 10px rgba(255, 220, 150, 0.5);
  z-index: 3;
  animation: pulse-center 3s infinite alternate;
}

.planet {
  position: relative; /* Changé de absolute à relative pour les info-bulles */
  border-radius: 50%;
  cursor: pointer;
  transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275), 
              box-shadow 0.4s ease, 
              filter 0.4s ease,
              opacity 0.4s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-align: center;
  overflow: visible; /* Changé de hidden à visible pour permettre aux info-bulles de dépasser */
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
              inset 0 0 20px rgba(255, 255, 255, 0.2);
  border: 2px solid rgba(255, 255, 255, 0.7);
  filter: drop-shadow(0 0 5px rgba(255, 255, 255, 0.3));
  /* Animation légère de flottement */
  animation: float 8s infinite ease-in-out;
  animation-delay: calc(var(--index, 0) * 1s);
  will-change: transform, box-shadow, filter; /* Optimisation de performance */
}

.planet::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle at 30% 30%, rgba(255, 255, 255, 0.5), transparent 70%);
  pointer-events: none;
  z-index: 1;
}

/* Ajout d'un effet d'anneau pour certaines planètes */
.planet:nth-child(odd)::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(30deg);
  width: 120%;
  height: 30%;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.4);
  pointer-events: none;
  opacity: 0.3;
  z-index: -1;
  transition: transform 0.4s ease, opacity 0.4s ease;
}

.planet-content {
  font-size: 1.2rem;
  font-weight: bold;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8);
  opacity: 0;
  z-index: 2;
}

/* Style pour les planètes au survol */
.planet:hover {
  transform: scale(1.3);
  z-index: 9999; /* Valeur très élevée pour s'assurer qu'il est au-dessus de tout */
  box-shadow: 0 0 30px var(--planet-color, rgba(255, 255, 255, 0.8)),
              inset 0 0 20px var(--planet-color, rgba(255, 255, 255, 0.5));
  border-color: var(--planet-color, rgba(255, 255, 255, 1));
}

/* Style pour le fallback (initial visible uniquement si l'image ne charge pas) */
.planet-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  z-index: 0;
}

.planet-info {
  position: absolute;
  bottom: 130%; /* Positionné au-dessus de la planète */
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0, 0, 0, 0.9);
  color: white;
  text-align: center;
  padding: 10px 15px;
  border-radius: 6px;
  width: 180px;
  z-index: 9999;
  opacity: 0;
  visibility: hidden; /* Caché par défaut */
  transition: opacity 0.3s, visibility 0.3s;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.7), 0 0 5px var(--planet-color, rgba(255, 255, 255, 0.3));
  border: 1px solid var(--planet-color, rgba(255, 255, 255, 0.3));
  pointer-events: none; /* Pour ne pas interférer avec les clics */
}

/* Flèche de l'info-bulle */
.planet-info::after {
  content: "";
  position: absolute;
  top: 100%; /* En bas de l'info-bulle */
  left: 50%;
  margin-left: -8px;
  border-width: 8px;
  border-style: solid;
  border-color: rgba(0, 0, 0, 0.9) transparent transparent transparent;
}

/* Titre dans l'info-bulle */
.planet-info h3 {
  margin: 0 0 5px 0;
  font-size: 1rem;
  color: var(--planet-color, #ffd700);
}

/* Description dans l'info-bulle */
.planet-info p {
  margin: 0;
  font-size: 0.9rem;
  color: #ffffff;
}

/* Affichage de l'info-bulle au survol */
.planet:hover .planet-info,
.planet:focus .planet-info {
  opacity: 1;
  visibility: visible;
}

/* Animations pour les éléments galactiques */
@keyframes pulse-core {
  0% { opacity: 0.5; transform: translate(-50%, -50%) scale(0.95); }
  100% { opacity: 0.7; transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes pulse-center {
  0% { opacity: 0.8; transform: translate(-50%, -50%) scale(0.9); }
  100% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
}

@keyframes float {
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-5px) rotate(2deg); }
}

/* Styles spécifiques pour chaque planète avec effets de traînée */
.planet-djflo {
  --planet-color: rgba(220, 20, 60, 0.7);
  box-shadow: 0 0 20px rgba(220, 20, 60, 0.7),
              inset 0 0 20px rgba(220, 20, 60, 0.3);
}
.planet-djflo::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 8px;
  background: linear-gradient(90deg, rgba(220, 20, 60, 0.7), transparent);
  transform: rotate(30deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

/* Style spécifique pour la planète Radio */
.planet-radio {
  background-size: contain !important; /* Changement pour mieux afficher le logo */
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-color: #000 !important; /* Fond noir pour mieux voir le logo */
  border: 2px solid var(--radio-color) !important; /* Border plus visible */
  box-shadow: 0 0 20px var(--radio-color), 
              inset 0 0 20px var(--radio-color) !important;
}

/* Style spécifique au survol de la planète radio */
.planet-radio:hover {
  transform: scale(1.5) !important;
  box-shadow: 0 0 30px var(--radio-color), 
              inset 0 0 25px var(--radio-color) !important;
}

/* Traînée derrière la planète radio */
.planet-radio::before {
  content: '';
  position: absolute;
  width: 220%;
  height: 10px;
  background: linear-gradient(90deg, rgba(65, 105, 225, 0.7), transparent);
  transform: rotate(45deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

.planet-events {
  --planet-color: rgba(50, 205, 50, 0.7);
  box-shadow: 0 0 20px rgba(50, 205, 50, 0.7),
              inset 0 0 20px rgba(50, 205, 50, 0.3);
}
.planet-events::before {
  content: '';
  position: absolute;
  width: 180%;
  height: 7px;
  background: linear-gradient(90deg, rgba(50, 205, 50, 0.7), transparent);
  transform: rotate(60deg);
  filter: blur(4px);
  opacity: 0.4;
  z-index: -1;
}

.planet-frds {
  --planet-color: rgba(255, 165, 0, 0.7);
  box-shadow: 0 0 20px rgba(255, 165, 0, 0.7),
              inset 0 0 20px rgba(255, 165, 0, 0.3);
}
.planet-frds::before {
  content: '';
  position: absolute;
  width: 190%;
  height: 9px;
  background: linear-gradient(90deg, rgba(255, 165, 0, 0.7), transparent);
  transform: rotate(75deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

.planet-piece-de-jeux {
  --planet-color: rgba(138, 43, 226, 0.7);
  box-shadow: 0 0 20px rgba(138, 43, 226, 0.7),
              inset 0 0 20px rgba(138, 43, 226, 0.3);
}
.planet-piece-de-jeux::before {
  content: '';
  position: absolute;
  width: 210%;
  height: 8px;
  background: linear-gradient(90deg, rgba(138, 43, 226, 0.7), transparent);
  transform: rotate(90deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

.planet-marw {
  --planet-color: rgba(255, 215, 0, 0.7);
  box-shadow: 0 0 20px rgba(255, 215, 0, 0.7),
              inset 0 0 20px rgba(255, 215, 0, 0.3);
}
.planet-marw::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 10px;
  background: linear-gradient(90deg, rgba(255, 215, 0, 0.7), transparent);
  transform: rotate(105deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

/* Nouvelles planètes */
.planet-emtro {
  --planet-color: rgba(70, 130, 180, 0.7);
  box-shadow: 0 0 20px rgba(70, 130, 180, 0.7),
              inset 0 0 20px rgba(70, 130, 180, 0.3);
}
.planet-emtro::before {
  content: '';
  position: absolute;
  width: 190%;
  height: 9px;
  background: linear-gradient(90deg, rgba(70, 130, 180, 0.7), transparent);
  transform: rotate(120deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

.planet-clothes {
  --planet-color: rgba(220, 80, 150, 0.7);
  box-shadow: 0 0 20px rgba(220, 80, 150, 0.7),
              inset 0 0 20px rgba(220, 80, 150, 0.3);
}
.planet-clothes::before {
  content: '';
  position: absolute;
  width: 210%;
  height: 8px;
  background: linear-gradient(90deg, rgba(220, 80, 150, 0.7), transparent);
  transform: rotate(135deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

.planet-aone {
  --planet-color: rgba(46, 204, 113, 0.7);
  box-shadow: 0 0 20px rgba(46, 204, 113, 0.7),
              inset 0 0 20px rgba(46, 204, 113, 0.3);
}
.planet-aone::before {
  content: '';
  position: absolute;
  width: 200%;
  height: 9px;
  background: linear-gradient(90deg, rgba(46, 204, 113, 0.7), transparent);
  transform: rotate(150deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

.planet-weather {
  --planet-color: rgba(155, 89, 182, 0.7);
  box-shadow: 0 0 20px rgba(155, 89, 182, 0.7),
              inset 0 0 20px rgba(155, 89, 182, 0.3);
}
.planet-weather::before {
  content: '';
  position: absolute;
  width: 220%;
  height: 10px;
  background: linear-gradient(90deg, rgba(155, 89, 182, 0.7), transparent);
  transform: rotate(165deg);
  filter: blur(5px);
  opacity: 0.4;
  z-index: -1;
}

/* Indicateur des bras spiraux amélioré */
.spiral-arms-indicator {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 800px;
  height: 800px;
  transform: translate(-50%, -50%);
  background-image: 
    /* Premier bras spiral */
    conic-gradient(
      from 45deg at center,
      transparent,
      rgba(255, 255, 255, 0.01) 10%,
      rgba(255, 255, 255, 0.03) 20%,
      rgba(100, 150, 255, 0.05) 30%,
      rgba(120, 170, 255, 0.08) 40%,
      rgba(100, 150, 255, 0.05) 50%,
      rgba(255, 255, 255, 0.03) 60%,
      transparent 70%
    ),
    /* Deuxième bras spiral */
    conic-gradient(
      from 225deg at center,
      transparent,
      rgba(255, 255, 255, 0.01) 10%,
      rgba(255, 255, 255, 0.03) 20%,
      rgba(255, 200, 100, 0.05) 30%,
      rgba(255, 220, 120, 0.08) 40%,
      rgba(255, 200, 100, 0.05) 50%,
      rgba(255, 255, 255, 0.03) 60%,
      transparent 70%
    ),
    /* Poussière stellaire diffuse */
    radial-gradient(
      circle at center,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0.05) 10%,
      rgba(255, 255, 255, 0.03) 20%,
      rgba(200, 200, 255, 0.02) 40%,
      rgba(200, 200, 255, 0.01) 60%,
      transparent 80%
    );
  border-radius: 50%;
  opacity: 0.7;
  filter: blur(15px);
  z-index: 1;
  pointer-events: none;
  animation: rotate-slow 240s linear infinite;
}

/* Ajout d'une seconde couche d'indicateur de bras spiraux plus diffuse */
.planets-container::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 1200px;
  height: 1200px;
  transform: translate(-50%, -50%);
  background-image: 
    /* Poussière stellaire en spirale */
    repeating-conic-gradient(
      from 0deg at center,
      transparent 0deg,
      rgba(255, 255, 255, 0.01) 5deg,
      rgba(230, 230, 255, 0.02) 10deg,
      rgba(255, 240, 200, 0.01) 15deg,
      transparent 20deg
    );
  border-radius: 50%;
  opacity: 0.3;
  filter: blur(20px);
  z-index: 0;
  pointer-events: none;
  animation: rotate-slow-reverse 300s linear infinite;
}

@keyframes rotate-slow-reverse {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(-360deg); }
}

/* Style pour la planète centrale */
.planet-central {
  position: absolute !important;
  z-index: 9998 !important; /* Juste en dessous du z-index des infobulles */
  background-size: contain !important;
  background-position: center !important;
  background-repeat: no-repeat !important;
  background-color: rgba(0, 0, 0, 0.5) !important;
  border: 3px solid var(--central-color) !important;
  box-shadow: 0 0 40px var(--central-color),
              inset 0 0 25px var(--central-color) !important;
  /* L'animation de pulsation est supprimée car maintenant gérée par JavaScript */
}

/* Effet de rayonnement coronaire - suit le mouvement de la planète centrale */
.planet-central::after {
  content: '';
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.2) 0%, transparent 70%);
  filter: blur(5px);
  animation: rotate 20s linear infinite;
  z-index: -1;
  /* L'aura suit la planète grâce à sa position absolute et top/left/right/bottom */
}

/* Effet d'aura supplémentaire - suit également la planète */
.planet-central::before {
  content: '';
  position: absolute;
  top: -25px;
  left: -25px;
  right: -25px;
  bottom: -25px;
  border-radius: 50%;
  border: 2px solid rgba(255, 215, 0, 0.2);
  box-shadow: 0 0 20px var(--central-color);
  filter: blur(10px);
  animation: rotate-reverse 30s linear infinite;
  opacity: 0.7;
  z-index: -1;
}

@keyframes rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes rotate-slow {
  0% { transform: translate(-50%, -50%) rotate(0deg); }
  100% { transform: translate(-50%, -50%) rotate(360deg); }
}

/* Effet de surlignage pour les planètes */
.planet-highlight {
  position: absolute;
  top: -5px;
  left: -5px;
  right: -5px;
  bottom: -5px;
  border-radius: 50%;
  border: 2px solid transparent;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  transition: opacity 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
}

.planet:hover .planet-highlight,
.planet:focus .planet-highlight {
  opacity: 1;
  border-color: var(--planet-color, rgba(255, 255, 255, 0.8));
  box-shadow: 0 0 20px var(--planet-color, rgba(255, 255, 255, 0.5));
  animation: pulse-highlight 2s infinite alternate ease-in-out;
}

/* Support pour le focus clavier (accessibilité) */
.planet:focus {
  outline: none;
  transform: scale(1.5) translateZ(30px);
  z-index: 1000;
  box-shadow: 0 0 40px var(--planet-color, rgba(255, 255, 255, 0.8)),
              inset 0 0 30px var(--planet-color, rgba(255, 255, 255, 0.3));
  filter: brightness(1.3) drop-shadow(0 0 15px var(--planet-color, rgba(255, 255, 255, 0.7)));
}

.planet:focus .planet-info {
  opacity: 1;
  visibility: visible;
  transform: translateX(-50%) translateY(0);
}

@keyframes pulse-highlight {
  0% { transform: scale(1); opacity: 0.7; }
  100% { transform: scale(1.1); opacity: 1; }
}

.planet-fallback {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  opacity: 0;
  z-index: 0;
}

/* Quand l'image ne charge pas, on affiche le fallback */
.planet[style*="background-image: none"] .planet-fallback {
  opacity: 1;
  z-index: 1;
}

/* Ajout d'un effet de planète texturé pour le fallback */
.planet[style*="background-image: none"]::before {
  background: radial-gradient(circle at 30% 30%, var(--planet-color, rgba(255, 255, 255, 0.5)), rgba(0, 0, 0, 0.3) 70%);
  opacity: 1;
}

.bottom-content {
  margin-top: 2rem;
}

/* Responsive */
@media (max-width: 600px) {
  .content-wrapper {
    padding: 0.5rem;
    padding-bottom: 2rem;
  }
  
  .main-title {
    font-size: 2.125rem;
  }
  
  .mission-section, .universe-section, .fonctionnement-section {
    padding: 0.7rem;
    border-radius: 10px;
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
  
  .mission-title, .universe-title, .fonctionnement-title {
    font-size: 1.5rem;
  }
  
  .mission-text, .universe-text, .fonctionnement-text {
    font-size: 1rem;
    margin-left: 0;
    margin-right: 0;
  }
  
  .logo-img {
    max-width: 150px;
    width: 96vw;
  }
  
  .planets-section {
    height: 50vh;
  }
  
  .credit-footer {
    font-size: 0.85rem;
    padding: 0.7rem 0 0.5rem 0;
  }
}
</style>