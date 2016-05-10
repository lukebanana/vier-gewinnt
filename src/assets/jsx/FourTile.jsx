var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({

    getInitialState: function(){
        return {
            reservedByPlayer : false
        }
    },


    onClickHandler: function(){
        if( this.props.activeTile != (this.props.tileX+"."+this.props.tileY) ){
            this.props.setActiveTile(this.props.tileX, this.props.tileY);
        }
    },

    render: function() {
        this.state.reservedByPlayer = ( this.props.activeTile == (this.props.tileX+"."+this.props.tileY) );

        var reseveredClass = '';
        if(this.state.reservedByPlayer){
            reseveredClass = 'reserved';
        }


        return (
            <div style={{height: this.props.tileHeight+"px", paddingTop: this.props.tileHeight/100*15}} className={"tile " + this.props.classKey + " " + reseveredClass}>
                <div onClick={this.onClickHandler} style={{height: this.props.tileHeight / 1.5  +"px", width: this.props.tileHeight / 1.5 }} className="tile__opening"></div>
            </div>
        );
    }
});

