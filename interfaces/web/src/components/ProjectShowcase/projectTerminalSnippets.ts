/**
 * @fileoverview Repository-keyed terminal mock lines for ProjectShowcase preview panels.
 */

/* *************************************************************************************************
 ********************************************* IMPORTS *********************************************
 ************************************************************************************************ */

// Component
import type { TerminalCodeLine } from './ProjectShowcase.types';
import {
  MockWindowScene,
  PortfolioRepositorySlug,
  TerminalCodeTokenRole,
} from './ProjectShowcase.types';

const VINICIUS_PORTFOLIO_LINES: TerminalCodeLine[] = [
  { text: '// interfaces/web — React + Vite', role: TerminalCodeTokenRole.Muted, delay: '0s' },
  {
    text: 'const { data } = useProjects();',
    role: TerminalCodeTokenRole.Plain,
    delay: '0.4s',
  },
  {
    text: 'return <ProjectShowcaseGrid projects={data} />;',
    role: TerminalCodeTokenRole.Accent,
    delay: '0.9s',
  },
  { text: '// backend — FastAPI + Socket.IO', role: TerminalCodeTokenRole.Muted, delay: '1.3s' },
  {
    text: '@router.get("/projects")  # REST API',
    role: TerminalCodeTokenRole.Keyword,
    delay: '1.8s',
  },
];

const REACTGRAM_LINES: TerminalCodeLine[] = [
  { text: '// reactgram/ — Create React App', role: TerminalCodeTokenRole.Muted, delay: '0s' },
  {
    text: 'const posts = useSelector(selectPublish);',
    role: TerminalCodeTokenRole.Plain,
    delay: '0.4s',
  },
  {
    text: 'dispatch(likePublish(postId));',
    role: TerminalCodeTokenRole.Accent,
    delay: '0.9s',
  },
  { text: '// npm run server', role: TerminalCodeTokenRole.Muted, delay: '1.3s' },
  {
    text: 'json-server --watch data/db.json',
    role: TerminalCodeTokenRole.Keyword,
    delay: '1.8s',
  },
];

const TASKS_FLASK_CRUD_LINES: TerminalCodeLine[] = [
  { text: '# tasks-flask-crud', role: TerminalCodeTokenRole.Muted, delay: '0s' },
  {
    text: '@app.route("/tasks", methods=["POST"])',
    role: TerminalCodeTokenRole.Accent,
    delay: '0.4s',
  },
  { text: 'def create_task():', role: TerminalCodeTokenRole.Keyword, delay: '0.9s' },
  {
    text: '  tasks.append(Task(id, title, ...))',
    role: TerminalCodeTokenRole.Plain,
    delay: '1.3s',
  },
  { text: '# tasks[] in memory — no DB', role: TerminalCodeTokenRole.Muted, delay: '1.8s' },
];

const SAMPLE_FLASK_AUTH_LINES: TerminalCodeLine[] = [
  { text: '# sample-flask-auth', role: TerminalCodeTokenRole.Muted, delay: '0s' },
  {
    text: '@app.route("/login", methods=["POST"])',
    role: TerminalCodeTokenRole.Accent,
    delay: '0.4s',
  },
  {
    text: 'bcrypt.checkpw(password, user.password)',
    role: TerminalCodeTokenRole.Plain,
    delay: '0.9s',
  },
  { text: 'login_user(user)', role: TerminalCodeTokenRole.Keyword, delay: '1.3s' },
  { text: '# Flask-Login + MySQL', role: TerminalCodeTokenRole.Muted, delay: '1.8s' },
];

const DEFAULT_REPOSITORY_LINES: TerminalCodeLine[] = [
  { text: '# repository', role: TerminalCodeTokenRole.Muted, delay: '0s' },
  { text: 'git clone <repo-url>', role: TerminalCodeTokenRole.Accent, delay: '0.5s' },
  { text: 'cd <project>', role: TerminalCodeTokenRole.Plain, delay: '1s' },
  { text: 'cat README.md', role: TerminalCodeTokenRole.Keyword, delay: '1.5s' },
];

const SNIPPETS_BY_REPOSITORY_SLUG: Record<string, TerminalCodeLine[]> = {
  [PortfolioRepositorySlug.ViniciusPortfolio]: VINICIUS_PORTFOLIO_LINES,
  [PortfolioRepositorySlug.ReactGram]: REACTGRAM_LINES,
  [PortfolioRepositorySlug.TasksFlaskCrud]: TASKS_FLASK_CRUD_LINES,
  [PortfolioRepositorySlug.SampleFlaskAuth]: SAMPLE_FLASK_AUTH_LINES,
};

const SCENE_BY_REPOSITORY_SLUG: Record<string, MockWindowScene> = {
  [PortfolioRepositorySlug.ViniciusPortfolio]: MockWindowScene.Shell,
  [PortfolioRepositorySlug.ReactGram]: MockWindowScene.Code,
  [PortfolioRepositorySlug.TasksFlaskCrud]: MockWindowScene.Code,
  [PortfolioRepositorySlug.SampleFlaskAuth]: MockWindowScene.Table,
};

/* *************************************************************************************************
 ********************************************* METHODS *********************************************
 ************************************************************************************************ */

/**
 * Resolves monospace terminal lines for a GitHub repository slug.
 */
export const getTerminalSnippetLinesForRepository = (
  repositorySlug: string,
): TerminalCodeLine[] => SNIPPETS_BY_REPOSITORY_SLUG[repositorySlug] ?? DEFAULT_REPOSITORY_LINES;

/**
 * Resolves mock window chrome variant for a repository (layout accent only).
 */
export const getMockWindowSceneForRepository = (
  repositorySlug: string,
): MockWindowScene => SCENE_BY_REPOSITORY_SLUG[repositorySlug] ?? MockWindowScene.Shell;
