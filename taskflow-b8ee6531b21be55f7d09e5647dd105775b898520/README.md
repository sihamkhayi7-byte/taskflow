# todo-vue

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

Q1 – .vue sépare template/logique/style → plus lisible. .tsx tout-en-un → plus flexible mais moins structuré.

Q2 – React privilégie l’immutabilité et un flux unidirectionnel explicite ; le two-way binding masque les mutations.

Q3 – Vue utilise des Proxy qui interceptent les mutations (ex: push) et déclenchent les mises à jour automatiquement.

Q4 – onMounted est plus lisible (nom explicite). React a choisi un tableau de dépendances pour optimiser et éviter les fermetures obsolètes.

Q5 – Les événements Vue (@delete) sont plus proches du HTML natif (onclick) que les callbacks en props de React.

Q6 – L’événement est ignoré silencieusement (rien ne se passe). Aucune erreur.

Q7 – Logique identique (2 hooks chacun). Seuls les noms changent : useRoute/useRouter (Vue) vs useParams/useNavigate (React).

Q8 – Fichier de config centralisé : plus facile à maintenir, à analyser et à ajouter des guards globaux.

Q9 – Pinia nécessite moins de concepts : defineStore + appel direct du store. Redux : slice, store, Provider, selector, dispatch.

Q10 – store.addTask() est plus intuitif (appel de méthode direct). L’avantage de Redux est le time-travel debugging.

Q11 – Identiques (nom change) : état local, effet montage, props, events. Différents : two-way binding, mutations directes, templates (directives) vs JSX, global state (dispatch vs appel direct).

Q12 – Vue est plus « magique ». Avantage : productivité, code court. Inconvénient : abstractions cachées, moins prévisible pour les gros projets.

Q13 – Les deux conviennent. React offre un écosystème plus large (Next.js, recrutement). Vue offre une structure plus claire pour les grandes équipes. Choix subjectif.

Q14 – Vue d’abord : syntaxe proche du HTML, moins de concepts, réactivité plus simple. React ensuite pour comprendre l’immutabilité et JSX.



TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```
