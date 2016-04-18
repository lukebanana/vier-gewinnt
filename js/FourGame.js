var FourTile = React.createClass({

    render: function() {

        return (
            <div className="tile">
               BLA
            </div>
        );
    }
});


var FourGame = React.createClass({
    getInitialState: function(){
        return {
            rows : 5,
            cols: 6,
            gameState: 0,
            btnText: "Start Game",
            tiles : []
        }
    },

    initializeGame: function(){
        console.log("Starting Game");

        // Fill Tiles with Components
        for(var y=0; y < this.state.rows; y++){
            for(var x=0; x < this.state.cols; x++){
                var key = y*x;
                this.state.tiles.push(<FourTile key={key} />);
            }
        }

        this.setState({gameState : 1});
        this.state.btnText = 'End Game';
    },


    endGame: function(){
        console.log("Ending Game");

        this.setState({gameState : 0});
        this.state.btnText = 'Start Game';
    },

    buttonClickHandler : function(){

        if(this.state.gameState == 0){
            this.initializeGame();
        }else if(this.state.gameState == 1){
            this.endGame();
        }

    },

    render: function() {

            return (
            <div className="game-canvas">
                {this.state.tiles}
                <button onClick={this.buttonClickHandler}>
                    {this.state.btnText}
                </button>

                Game State: {this.state.gameState}
            </div>
        );
    }
});


ReactDOM.render(
    <FourGame/>,
    document.getElementById('content')
);
