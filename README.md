[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Docker-pulls][DockerPulls]][DockerPulls-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/Anders-planck/ingblog">
    <img src="logo.jpeg" alt="Logo" width="160" height="160" style="border-radius: 10px">
  </a>

<h3 align="center">
    ISA Blog
</h3>

  <p align="center">
    An awesome blog for the ISA community!
    where Students, Teachers can share their experiences and knowledge.
    <br />
    <a href="https://github.com/Anders-planck/ingblog"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="https://github.com/Anders-planck/ingblog">View Demo</a>
    ·
    <a href="https://github.com/Anders-planck/ingblog/issues/new?labels=bug&template=bug-report---.md">Report Bug</a>
    ·
    <a href="https://github.com/Anders-planck/ingblog/issues/new?labels=enhancement&template=feature-request---.md">Request Feature</a>
      .
   <a href="https://hub.docker.com/r/andersplanck/isa-blog">
    <img src="https://img.shields.io/docker/pulls/andersplanck/isa-blog?style=for-the-badge" alt="Docker Pulls" />
  </a>

  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
         <li><a href="#at-least-partial-specification-of-the-project-specifica-almeno-parziale-del-progetto">At least partial specification of the project (specifica almeno parziale del progetto)</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

[![Product Name Screen Shot][product-screenshot]](https://leco-education.me/)


<p align="right">(<a href="#readme-top">back to top</a>)</p>



### Built With

* [![Vite][Vite.js]][vite-url]
* [![React][React.js]][React-url]

#### other technologies

* [![supabase][Supabase.js]][Supabase-url] : Supabase is an open-source Firebase alternative. It is a service to simplify the backend of your applications.
* [![Vercel][Vercel.js]][Vercel-url] : Vercel is a cloud platform for static sites and Serverless Functions that fits perfectly with your workflow.
* [![Mantine][Mantine.dev]][Mantine-url] : Mantine.dev is a React components and hooks library with native dark theme support focused on usability and accessibility.
* [![Vitest][Vitest.js]][Vitest-url] : Vitest is a fast, lightweight, and opinionated test runner for modern JavaScript projects.
* [![DockerHub][DockerHub]][DockerHub-url] : Docker is a set of platform as a service products that use OS-level virtualization to deliver software in packages called containers.
* [![GithubOAuth][GithubOAuth]][GithubOAuth-url] : GitHub OAuth is a simple way to use GitHub as an identity provider for your app.
* [![GoogleOAuth][GoogleOAuth]][GoogleOAuth-url] : Google OAuth is a simple way to use Google as an identity provider for your app.
* [![PostCss][PostCss]][PostCss-url] : PostCSS is a tool for transforming styles with JS plugins. These plugins can lint your CSS, support variables and mixins, transpile future CSS syntax, inline images, and more.
* [![Redux-toolkit][Redux-toolkit]][Redux-toolkit-url] : Redux Toolkit is the official, opinionated, batteries-included toolset for efficient Redux development.
* [![Rtk-query][Rtk-query]][Rtk-query-url] : RTK Query is a powerful data fetching and caching tool that is designed to simplify common cases for loading data in a web application.
* [![Ract-hook-form][React-hook-form]][React-hook-form-url] : React Hook Form is a performant, flexible and extensible forms with easy-to-use validation.


<p align="right">(<a href="#readme-top">back to top</a>)</p>


## Features

This template comes with the following features:

- [PostCSS](https://postcss.org/) with [mantine-postcss-preset](https://mantine.dev/styles/postcss-preset)
- [TypeScript](https://www.typescriptlang.org/)
- [Storybook](https://storybook.js.org/)
- [Vitest](https://vitest.dev/) setup with [React Testing Library](https://testing-library.com/docs/react-testing-library/intro)
- ESLint setup with [eslint-config-mantine](https://github.com/mantinedev/eslint-config-mantine)
- Prettier setup with [mantine-prettier](https://github.com/mantinedev/mantine/blob/master/.prettierrc.mjs)

## yarn scripts

## Build and dev scripts

- `dev` – start development server
- `build` – build production version of the app
- `preview` – locally preview production build

### Testing scripts

- `typecheck` – checks TypeScript types
- `lint` – runs ESLint
- `prettier:check` – checks files with Prettier
- `vitest` – runs vitest tests
- `vitest:watch` – starts vitest watch
- `test` – runs `vitest`, `prettier:check`, `lint` and `typecheck` scripts

### Other scripts

- `storybook` – starts storybook dev server
- `storybook:build` – build production storybook bundle to `storybook-static`
- `prettier:write` – formats all files with Prettier



<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

For this project,
you will need to have Docker installed on your machine to run the node server.
If you don't have Docker installed, you can download it from [here](https://www.docker.com/products/docker-desktop).

## At least partial specification of the project (specifica almeno parziale del progetto)

Ecco una descrizione di alto livello di alcuni dei componenti chiave del progetto:

1. `src/components/Layout/Footer/Footer.tsx`: Questo è il componente del piè di pagina dell'applicazione. Mostra alcuni link e il copyright dell'applicazione.

2. `src/components/ConfirmationModal/index.tsx`: Questo componente mostra una finestra modale di conferma. Viene utilizzato per richiedere la conferma dell'utente prima di eseguire un'azione importante.

3. `src/components/Comment/index.tsx`: Questo componente gestisce la visualizzazione dei commenti in un post del blog.

4. `src/components/ColorSchemeToggle/ColorSchemeToggle.tsx`: Questo componente permette agli utenti di cambiare il tema dell'applicazione tra chiaro e scuro.

5. `src/components/Auth/index.tsx`: Questo componente gestisce l'autenticazione degli utenti. Supporta l'accesso tramite email, Google e GitHub.

6. `src/components/Auth/utils.ts`: Questo file contiene alcune funzioni di utilità per la gestione dell'autenticazione.

7. `docker/node/Dockerfile`: Questo file Dockerfile definisce un'immagine Docker che esegue l'applicazione in un ambiente Node.js.

8. `.github/workflows/CICD.yml`: Questo file definisce un workflow di GitHub Actions per l'integrazione continua e la distribuzione continua (CI/CD) dell'applicazione.

9. `.storybook/main.ts`: Questo file configura Storybook, uno strumento per sviluppare componenti UI in isolamento.

10. `.husky/pre-commit`: Questo file definisce un hook Git pre-commit che esegue i test dell'applicazione prima di ogni commit.

11. `src/pages/Home.page.tsx`: Questa è la pagina principale dell'applicazione. Mostra una lista di post. Gli utenti possono cercare post e, se autenticati, possono navigare alla pagina per aggiungere un nuovo post.

12. `src/pages/Post/PostView/index.tsx`: Questa pagina visualizza un post singolo in dettaglio. Mostra il titolo, l'immagine, l'autore, la data di creazione, il numero di likes, bookmarks e commenti. Se l'utente è autenticato, può anche aggiungere un commento al post.

13. `src/pages/Post/AddPost/index.tsx`: Questa pagina permette agli utenti autenticati di creare un nuovo post. Gli utenti possono inserire il titolo, l'URL dell'immagine, la categoria, una descrizione generale e il contenuto del post.

14. `src/pages/Auth/index.tsx`: Questa pagina gestisce l'autenticazione degli utenti. Se un utente non è autenticato, viene reindirizzato a questa pagina.

15. `src/pages/Account/index.tsx`: Questa pagina mostra le informazioni dell'account dell'utente autenticato. Gli utenti possono visualizzare e modificare le loro informazioni personali, visualizzare i post che hanno salvato e i post che hanno messo mi piace.

16. `src/pages/Post/Comment/CommentForm/index.tsx` e `src/pages/Post/Comment/CommentView/index.tsx`: Queste pagine gestiscono la visualizzazione e l'aggiunta di commenti a un post. Gli utenti autenticati possono aggiungere un commento a un post.

17. `src/lib/supabase.ts` è responsabile per l'inizializzazione del client Supabase nell'applicazione. Supabase è un servizio open source che fornisce funzionalità di backend come autenticazione, storage di file, e un database, tra le altre cose.

Il progetto sembra avere una struttura di directory `src/components` che contiene vari componenti React. Ecco una descrizione di alto livello di alcuni dei componenti chiave:

1. `src/components/Layout/Footer/Footer.tsx`: Questo è il componente del piè di pagina dell'applicazione. Mostra alcuni link e il copyright dell'applicazione.

2. `src/components/ConfirmationModal/index.tsx`: Questo componente mostra una finestra modale di conferma. Viene utilizzato per richiedere la conferma dell'utente prima di eseguire un'azione importante.

3. `src/components/Comment/index.tsx`: Questo componente gestisce la visualizzazione dei commenti in un post del blog.

4. `src/components/ColorSchemeToggle/ColorSchemeToggle.tsx`: Questo componente permette agli utenti di cambiare il tema dell'applicazione tra chiaro e scuro.

5. `src/components/Auth/index.tsx`: Questo componente gestisce l'autenticazione degli utenti. Supporta l'accesso tramite email, Google e GitHub.

6. `src/components/Auth/utils.ts`: Questo file contiene alcune funzioni di utilità per la gestione dell'autenticazione.

7. `src/components/Post/index.tsx`: Questo componente visualizza un post del blog. Mostra il titolo, l'autore, la data di creazione, il numero di likes, bookmarks e commenti. Se l'utente è autenticato, può anche aggiungere un commento al post.

8. `src/components/SearchModal/index.tsx`: Questo componente mostra una finestra modale di ricerca. Gli utenti possono utilizzarla per cercare post nel blog.

9. `src/components/Welcome/Welcome.tsx`: Questo componente mostra un messaggio di benvenuto agli utenti quando visitano l'applicazione per la prima volta.

10. `src/components/Post/CommentForm/index.tsx` e `src/components/Post/CommentView/index.tsx`: Questi componenti gestiscono la visualizzazione e l'aggiunta di commenti a un post. Gli utenti autenticati possono aggiungere un commento a un post.

Ogni componente utilizza vari elementi di React e librerie di terze parti per costruire l'interfaccia utente. Ad esempio, il componente `ColorSchemeToggle` potrebbe utilizzare un componente `Switch` da una libreria di componenti UI per implementare l'interruttore del tema. Allo stesso modo, il componente `Auth` potrebbe utilizzare un componente `Form` e vari componenti `Input` per implementare il modulo di autenticazione.

Ogni pagina utilizza vari componenti per costruire l'interfaccia utente, come `Post`, `CommentCard`, `AuthForm`, `UserInfoIcons`, `UpdateInfoUser`, e altri. Questi componenti sono riutilizzabili e possono essere utilizzati in diverse pagine.

Il progetto utilizza anche il routing per navigare tra le diverse pagine. Le rotte dell'applicazione sono definite nel file `src/routes.ts`.

Inoltre, il progetto utilizza Redux per la gestione dello stato dell'applicazione. Il codice relativo a Redux si trova nella directory `src/store`.

Infine, il progetto utilizza vari servizi per interagire con il backend, come `useGetPostsQuery`, `usePostNewPostMutation`, `useGetPostQuery`, e altri. Questi servizi sono definiti nella directory `src/services`.
Il progetto utilizza anche altre tecnologie come Vercel per il deployment, Supabase per il backend e il database, e Docker per l'isolamento dell'ambiente di esecuzione.

Il progetto utilizza Docker per creare un ambiente di esecuzione isolato per l'applicazione. Questo è fatto attraverso un file Dockerfile e un file docker-compose.yml.

Il file Dockerfile si trova nella directory `docker/node` e definisce un'immagine Docker che esegue l'applicazione in un ambiente Node.js. Ecco una descrizione di alto livello del contenuto del file Dockerfile:

```Dockerfile
# Utilizza un'immagine Node.js come base
FROM node:16

# Imposta la directory di lavoro nel container
WORKDIR /app

# Copia i file package.json e package-lock.json nel container
COPY package*.json ./

# Installa le dipendenze del progetto
RUN npm install

# Copia il resto dei file del progetto nel container
COPY . .

# Espone la porta 3000 del container
EXPOSE 3000

# Esegue l'applicazione quando il container viene avviato
CMD [ "npm", "run", "dev" ]
```

Il file docker-compose.yml si trova nella directory principale del progetto e definisce i servizi che compongono l'applicazione. Ecco una descrizione di alto livello del contenuto del file docker-compose.yml:

```yaml
version: '3.8'
services:
  node:
    build:
      context: .
      dockerfile: docker/node/Dockerfile
    volumes:
      - .:/app
      - /app/node_modules
    ports:
      - 3000:3000
    environment:
      - NODE_ENV=development
```

Questo file definisce un servizio `node` che costruisce un'immagine Docker utilizzando il Dockerfile specificato. Il servizio monta la directory corrente del progetto nel container e espone la porta 3000 del container. Infine, imposta la variabile d'ambiente `NODE_ENV` su `development`.

Per avviare l'applicazione, è possibile utilizzare il comando `docker-compose up`. Questo comando costruirà l'immagine Docker se non è già stata costruita, creerà un nuovo container basato sull'immagine e avvierà l'applicazione nel container.


### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/Anders-planck/ingblog.git
   ```

2. cd in docker folder and copy the `.env.dist ` file to `.env`  and fill in the required fields.
    ```sh
   cd docker && cp .env.dist .env && 
    echo "VERCEL_ISA_BLOG_TOKEN=your_token_vercel" >> .env &&
    echo "VERCEL_ORG_ID=org_id" >> .env &&
    echo "VERCEL_PROJECT_ID=project_id" >> .env &&
    echo "VERCEL_APP_NAME=app_name" >> .env
   ```

3. Run the docker-compose file.
   ```sh
   docker compose build &&
   docker compose up
   ```
    * if you want to run the docker-compose in the background, you can use the `-d` flag.
    ```sh
    docker compose up -d
    ```
    * if you want to stop the docker-compose, you can use the `down` command.
    ```sh
    docker compose down
    ```
    * if you want to work in the node container, you can use the `exec` command.
    ```sh
    docker compose exec node bash -c 'if type zsh &> /dev/null; then zsh; else apt install -y git curl zsh && curl -fsSL https://raw.githubusercontent.com/fabiobedeschi/dotzsh/master/auto_install | sh && zsh; fi'
    ```
4. Initialize the vercel and prisma.
    ```sh
    docker compose exec node /bin/bash setup_vercel.sh
    docker compose exec node vercel env pull .env.development.local --token=${{ secrets.VERCEL_ISA_BLOG_TOKEN }}
    docker compose exec node cp  .env.development.local .env
    ```

5. Install NPM packages
   ```sh
    docker compose exec node npm install
   ```
6. Initialize the prisma
    ```sh
    docker compose exec node npx prisma migrate dev --name init
    docker compose exec node npx prisma generate
    ```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Usage

ISA Blog is a platform designed for the ISA community, where students and teachers can share their experiences and knowledge. Here's how you can use it:

1. **Create an Account**: Sign up using your email address to create an account.
2. **Write a Blog Post**: Once you're logged in, you can write a blog post about your experiences or knowledge that you want to share with the ISA community.
3. **Read Blog Posts**: Browse through the blog posts written by other members of the ISA community. You can filter posts by author or topic.
4. **Comment on Blog Posts**: Engage with other members of the ISA community by commenting on their blog posts.
5. **Share Blog Posts**: Share blog posts on your social media platforms to help spread the knowledge.
## Roadmap

Here are some features we're planning to add in the future:

- [x] **User Profiles**: Allow users to create and customize their own profiles, including a bio, profile picture, and links to their social media accounts.
- [x] **Post Categories**: Implement categories for blog posts, allowing users to easily find posts on topics they're interested in.
- [x] **Commenting System**: Enable users to comment on blog posts, fostering discussion and engagement within the ISA community.
    - [ ] **Nested Comments**: Allow users to reply to comments, creating threads of discussion.
- [x] **Post Likes**: Implement a system for users to 'like' posts.
- [ ] providing feedback to authors and helping to highlight popular posts.
- [x] **Search Functionality**: Add a search bar to allow users to easily find posts by title, author, or category.
- [ ] **User Notifications**: Implement a notification system to alert users of new comments on their posts or replies to their comments.

Please note that this roadmap is subject to change based on user feedback and priorities.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the open-source community
such an amazing place to learn, inspire, and create.
Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#readme-top">back to top</a>)</p>



<!-- CONTACT -->
## Contact

Project Link: [https://github.com/Anders-planck/ingblog](https://github.com/Anders-planck/ingblog)

<p align="right">(<a href="#readme-top">back to top</a>)</p>


<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/Anders-planck/ingblog.svg?style=for-the-badge
[contributors-url]: https://github.com/Anders-planck/ingblog/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/Anders-planck/ingblog.svg?style=for-the-badge
[forks-url]: https://github.com/Anders-planck/ingblog/network/members
[stars-shield]: https://img.shields.io/github/stars/Anders-planck/ingblog.svg?style=for-the-badge
[stars-url]: https://github.com/Anders-planck/ingblog/stargazers
[issues-shield]: https://img.shields.io/github/issues/Anders-planck/ingblog.svg?style=for-the-badge
[issues-url]: https://github.com/Anders-planck/ingblog/issues
[license-shield]: https://img.shields.io/github/license/Anders-planck/ingblog.svg?style=for-the-badge
[license-url]: https://github.com/Anders-planck/ingblog/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/anders-planck-53184b1b4
[product-screenshot]: isa-screen.png
[Next.js]: https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white
[Next-url]: https://nextjs.org/
[React.js]: https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB
[React-url]: https://reactjs.org/
[Vue.js]: https://img.shields.io/badge/Vue.js-35495E?style=for-the-badge&logo=vuedotjs&logoColor=4FC08D
[Vue-url]: https://vuejs.org/
[Angular.io]: https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white
[Angular-url]: https://angular.io/
[Svelte.dev]: https://img.shields.io/badge/Svelte-4A4A55?style=for-the-badge&logo=svelte&logoColor=FF3E00
[Svelte-url]: https://svelte.dev/
[Laravel.com]: https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white
[Laravel-url]: https://laravel.com
[Bootstrap.com]: https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white
[Bootstrap-url]: https://getbootstrap.com
[JQuery.com]: https://img.shields.io/badge/jQuery-0769AD?style=for-the-badge&logo=jquery&logoColor=white
[JQuery-url]: https://jquery.com
[Prisma.js]: https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white
[Prisma-url]: https://www.prisma.io/
[Vercel.js]: https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white
[Vercel-url]: https://vercel.com/
[VercelPostgres.js]: https://img.shields.io/badge/VercelPostgres-336791?style=for-the-badge&logo=postgresql&logoColor=white
[VercelPostgres-url]: https://vercel.com/docs/solutions/nextjs/postgres
[Tailwind.js]: https://img.shields.io/badge/Tailwind-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white
[Tailwind-url]: https://tailwindcss.com/
[Jest.js]: https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white
[Jest-url]: https://jestjs.io/
[Supabase.js]: https://img.shields.io/badge/Supabase-000000?style=for-the-badge&logo=supabase&logoColor=white
[Supabase-url]: https://supabase.io/
[Mantine.dev]: https://img.shields.io/badge/Mantine-6f42c1?style=for-the-badge&logo=mantine&logoColor=white
[Mantine-url]: https://mantine.dev/
[Vitest.js]: https://img.shields.io/badge/Vitest-000000?style=for-the-badge&logo=jest&logoColor=white
[Vitest-url]: https://vitest.dev/
[DockerHub]: https://img.shields.io/badge/DockerHub-2496ED?style=for-the-badge&logo=docker&logoColor=white
[DockerHub-url]: https://hub.docker.com/
[GithubOAuth]: https://img.shields.io/badge/GithubOAuth-181717?style=for-the-badge&logo=github&logoColor=white
[GithubOAuth-url]: https://docs.github.com/en/developers/apps/building-oauth-apps
[GoogleOAuth]: https://img.shields.io/badge/GoogleOAuth-4285F4?style=for-the-badge&logo=google&logoColor=white
[GoogleOAuth-url]: https://developers.google.com/identity/protocols/oauth2
[Vite.js]: https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white
[vite-url]: https://vitejs.dev/
[PostCss]: https://img.shields.io/badge/PostCss-DD3A0A?style=for-the-badge&logo=postcss&logoColor=white
[PostCss-url]: https://postcss.org/
[Redux-toolkit]: https://img.shields.io/badge/Redux-toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Redux-toolkit-url]: https://redux-toolkit.js.org/
[Rtk-query]: https://img.shields.io/badge/Rtk-query-764ABC?style=for-the-badge&logo=redux&logoColor=white
[Rtk-query-url]: https://redux-toolkit.js.org/rtk-query/overview
[React-hook-form]: https://img.shields.io/badge/React-hook-form?style=for-the-badge&logo=react&logoColor=white
[React-hook-form-url]: https://react-hook-form.com/
[DockerPulls]: https://img.shields.io/docker/pulls/andersplanck/isa-blog?style=for-the-badge
[DockerPulls-url]: https://hub.docker.com/r/andersplanck/isa-blog

