import { List } from './components/list/index'
import { TopPanel } from "./components/top-panel/index";

let app: HTMLElement = document.querySelector('.app');

const topPanel: TopPanel = new TopPanel();
app.appendChild(topPanel.element);

const list: HTMLElement = new List().element;
app.appendChild(list);

List.loadList();
