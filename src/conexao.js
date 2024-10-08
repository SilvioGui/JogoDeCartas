import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-app.js';
import { getDatabase, ref, set, get, child, onValue,remove } from 'https://www.gstatic.com/firebasejs/9.1.3/firebase-database.js';

export class Conexao {
    // Construtor para inicializar os objetos da classe
    constructor() {
console.info('[START]:  ');
        this.firebaseConfig = {
            apiKey: "API_KEY",
            authDomain: "jogo-de-cartas---hellk.firebaseapp.com",
            projectId: "jogo-de-cartas---hellk",
            storageBucket: "jogo-de-cartas---hellk.appspot.com",
            messagingSenderId: "672094787753",
            appId: "1:672094787753:web:3186258dd013580aadb1b8",
            measurementId: "G-QYPJ3S7ZRK"
        };

        // Inicializando o app Firebase e o banco de dados
        this.app = initializeApp(this.firebaseConfig);
        this.database = getDatabase(this.app);
        this.currentRoomId=null;
        this.currentPlayerId=null;
        this.currentPlayerIdOp=null;
       // console.log("Banco Conectado")
    }

    // Método para retornar a referência do banco de dados
    getDatabaseRef() {
        return this.database;
    }

    getRoom(roomId) {
        const roomRef = ref(this.getDatabaseRef(), `rooms/${roomId}`);
        return get(roomRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                //console.log('Dados da sala:', snapshot.val());
                return snapshot.val();
            } else {
                console.log('Sala não encontrada');
                return null;
            }
        })
            .catch((error) => {
            console.error('Erro ao buscar dados da sala:', error);
        });
    }

    setRoom() {
        this.currentRoomId = Math.random().toString(36).substr(2, 9); // Gerar ID de sala aleatório
        let roomRef = ref(this.getDatabaseRef(), `rooms/${this.currentRoomId}`);

        set(roomRef, {
            status: 'waiting',
            buttons: {}
        }).then(() => {
            //console.log('Dados da sala salvos com sucesso!');
        }).catch((error) => {
            //console.error('Erro ao salvar dados da sala:', error);
        });
    }

    getPlayer(roomId, playerId) {
        const playerRef = ref(this.getDatabaseRef(), `rooms/${roomId}/player-${playerId}`);
        return get(playerRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                //console.log('Dados do jogador:', snapshot.val());
                return snapshot.val();
            } else {
                //console.log('Jogador não encontrado');
                return null;
            }
        })
            .catch((error) => {
            //console.error('Erro ao buscar dados do jogador:', error);
        });
    }



    setPlayer() {

        this.currentPlayerId = "PLAYER-1"
        let playerRef = ref(this.getDatabaseRef(), `rooms/${this.currentRoomId}/${this.currentPlayerId}`);
        set(playerRef, {
            status: 'ON',
            life:'0',
            deck:'goblin', // provisorio
            qtn_card_deck:'40', // provisorio
            mao: {status: 'waiting',},
            campo_superior:{ status: 'waiting',},
            campo_inferior:{status: 'waiting',},
            cemiterio_jogador:{status: 'waiting',},
            extra_deck:{status: 'waiting',},

        }).then(() => {
           //console.log('Dados do jogador salvos com sucesso!');
        }).catch((error) => {
           // console.error('Erro ao salvar dados do jogador:', error);
        });

        this.currentPlayerIdOp = "PLAYER-2"
        let playerRef2 = ref(this.getDatabaseRef(), `rooms/${this.currentRoomId}/${this.currentPlayerIdOp}`);
        set(playerRef2, {
            status: 'waiting',
            life:'0',
            deck:'goblin', // provisorio
            qtn_card_deck:'40', // provisorio
            mao: {status: 'waiting',},
            campo_superior:{ status: 'waiting',},
            campo_inferior:{status: 'waiting',},
            cemiterio:{status: 'waiting',},
            extra_deck:{status: 'waiting',},

        }).then(() => {
            //console.log('Dados do jogador salvos com sucesso!');
        }).catch((error) => {
            //console.error('Erro ao salvar dados do jogador:', error);
        });

    }


    getCard(roomId, playerId, location) {
        const cardRef = ref(this.getDatabaseRef(), `rooms/${roomId}/player-${playerId}/${location}`);
        return get(cardRef)
            .then((snapshot) => {
            if (snapshot.exists()) {
                //console.log('Dados do cartão:', snapshot.val());
                return snapshot.val();
            } else {
                console.log('Cartão não encontrado');
                return null;
            }
        })
            .catch((error) => {
           // console.error('Erro ao buscar dados do cartão:', error);
        });
    }

    setCard(location,carta) {
       /* console.log("carta: ",carta.dataset);
        console.log("room: ",this.currentRoomId);
        console.log("player: ",this.currentPlayerId);
        console.log("id: ",location);*/
        const nome = carta.dataset.nome;
        const tipo = carta.dataset.tipo;
        const atk = carta.dataset.atk;
        const def = carta.dataset.def;
        const id = carta.dataset.id;

        let playerRef = ref(this.getDatabaseRef(), `rooms/${this.currentRoomId}/${this.currentPlayerId}/${location}/${nome}-${id}`);
        set(playerRef, {
            status: 'set',
            nome: nome,
            tipo: tipo,
            atk: atk,
            def: def,
            id:id,
            buttons: {}
        }).then(() => {
            //console.log('Dados do cartão salvos com sucesso!');
        }).catch((error) => {
           // console.error('Erro ao salvar dados do cartão:', error);
        });


    }
    deleteCard(location, carta) {

        let playerRef = ref(this.getDatabaseRef(), `rooms/${this.currentRoomId}/${this.currentPlayerId}/${location}/${carta.dataset.nome}-${carta.dataset.id}`);
//console.log("playerRef delet:",playerRef);
        remove(playerRef).then(() => {
           // console.log('Carta removida com sucesso!');
        }).catch((error) => {
           // console.error('Erro ao remover carta:', error);
        });
    }




}
