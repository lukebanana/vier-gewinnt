var React = require('react');
var ReactDOM = require('react-dom');
var FourTile = require('./FourTile.jsx');

module.exports = React.createClass({
    getInitialState: function(){
        return {
            rows : 6,
            cols: 7,
            gameState: 0,
            btnText: "Start Game",
            tileHeight: 20,
            tileWidth: 20,
            activeTileX: null,
            activeTileY: null,
            playerID: 0,
        }
    },

    initializeGame: function(){
        console.log("Starting Game");

        this.resize();

        this.setState({
            gameState : 1,
            playerID : 1,
            btnText : 'End Game'
        });
    },


    endGame: function(){
        console.log("Ending Game");

        this.setState({
            gameState : 0,
            btnText : 'Start Game',
            rows : 6,
            cols: 7,
            tileHeight: 20,
            tileWidth: 20,
            activeTileX: null,
            activeTileY: null,
            playerID: 0
        });
    },

    /**
     * Sets activeTileX and Y to selectedTileX and selectedTileY
     * */
    setActiveTile: function(selectedTileX, selectedTileY){

        this.setState({
            activeTileX: selectedTileX,
            activeTileY: selectedTileY
        });

    },

    gameStateButtonClickHandler: function(){
        if(this.state.gameState == 0){
            this.initializeGame();
        }else if(this.state.gameState == 1){
            this.endGame();
        }
    },

    componentDidMount: function() {
        this.resize();
        $(window).on('resize', this.resize);
    },

    resize: function() {
        var $canvas = $('.game-canvas');
        this.setState(
            {
                tileHeight : $canvas.height() / this.state.rows,
                tileWidth : $canvas.height() / this.state.cols

            }
        );
    },

    componentWillUnmount: function() {
        $(window).off('resize', this.resize);
    },

    render: function() {
        var res = [];
        var btn = '';
        var activeID = this.state.activeTileX +"."+this.state.activeTileY;

        // Fill Tiles with Components
        if(this.state.gameState != 0){
            for(var y=0; y < this.state.rows; y++){

                var tiles = [];
                for(var x=0; x < this.state.cols; x++){
                    tiles.push(
                        <div className="tile-wrapper" key={x+"-"+y} style={{width: 100/this.state.cols + "%"}}>
                            <FourTile
                                tileX={x}
                                tileY={y}
                                activeTile={activeID}
                                activeTileX={this.state.activeTileX}
                                activeTileY={this.state.activeTileY}
                                setActiveTile={this.setActiveTile}
                                tileHeight={this.state.tileHeight}
                                tileWidth={this.state.tileWidth}
                                classKey={"tile-"+ y + "-" + x}
                             />
                        </div>);

                }
                res.push(<div key={y} className="row">{tiles}</div>);
            }
        }



        if(this.state.gameState == 1){
            btn = <button className="button" onClick={this.gameStateButtonClickHandler}>
                    {this.state.btnText}
                  </button>

        }


        return (
            <div className="game-canvas">
                <div className="tiles">
                    {res}
                </div>
                <button className="button" onClick={this.gameStateButtonClickHandler}>
                    {this.state.btnText}
                </button>
                {btn}

                <ul className="debug">
                    <li>Game State: {this.state.gameState}</li>
                    <li>Tile Height: {this.state.tileHeight}</li>
                    <li>Tile Height: {this.state.tileWidth}</li>
                    <li>Player ID: {this.state.playerID}</li>
                    <li>Active Tile ID: {this.state.activeTileX+"."+this.state.activeTileY}</li>
                </ul>
            </div>
        );
    }
});
