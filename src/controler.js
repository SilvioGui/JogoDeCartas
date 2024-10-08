import { Conexao } from './conexao.js';
import { Carta } from './carta.js';
import jsonCartas from './data.json';
import {
	getDatabase,
	ref,
	set,
	get,
	child,
	onValue,
} from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

class Controler {
	constructor() {
		console.info('[START - CONTRO]:  ');
		console.log('anda');
		this.conexao = new Conexao();
		this.listaElementos();
		this.listaEventos();
		this.cartas = jsonCartas.map(
			carta =>
				new Carta(
					carta.id,
					carta.nome,
					carta.nível,
					carta.ataque,
					carta.defesa,
					carta.tipo,
					carta.efeito1,
					carta.efeito2,
					carta.custo
				)
		);
		console.log(this.cartas);
		this.maoJogador = document.getElementById('mao');
	}

	listaEventos() {
		console.info('[START - LISTA_EVENTOS]:');
		// Função destinada a definir os eventos dos Botões

		this.sacarBtn.addEventListener('click', () => this.puxarCarta());
	}

	listaElementos() {
		console.info('[START - LISTA_ELEMENTOS]:  ');
		this.sacarBtn = document.getElementById('sacarBtn');
	}

	puxarCarta() {
		console.log(this.cartas);
		const cartaPuxada = this.cartas.shift(); // Remove a primeira carta do deck

		const novaCartaDiv = document.createElement('div');
		novaCartaDiv.innerHTML = cartaPuxada.exibirCarta(); // Exibe a carta como HTML
		const conteudoCarta = novaCartaDiv.firstElementChild;
		// Adiciona a carta à área da mão do jogador

		this.maoJogador.appendChild(cartaPuxada.divCarta());
		this.slotOriginal = conteudoCarta;
	}
}

const Jogo = new Controler();
