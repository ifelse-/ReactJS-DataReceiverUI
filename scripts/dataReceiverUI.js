// JavaScript Document
var DropDown = React.createClass({
    render: function() {
	  return ( 
		<option value={this.props.gotauthor}>{this.props.gottext}</option>
	   ); 
	}
});

var UIContainer = React.createClass({
   render: function() {
	  return (
	    <DropDown gotauthor={this.props.getauthor} gottext={this.props.gettext}/>
		);
	  }
});
var DataEngine = React.createClass({
 getInitialState: function() {
    return {elementContainer: []};
  },	
  watchListener: function(a) {
	 //console.log('working');
   this.state.elementContainer.push(a);
   console.log(this.state.elementContainer);
     
	  }, 	
  render: function() {
	  var watchElem = this.watchListener;
	  var dataNodes = this.props.data.map(function (items) {
	  watchElem(items.author);
      return (
		 <UIContainer key={items.author} getauthor={items.author} gettext={items.text} />
      );
	 }); 
    return (
     <div id="listener">
        {dataNodes}
      </div>
    );
  }
});
var Receiver = React.createClass({
  loadDataFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },	
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
    this.loadDataFromServer();
    //setInterval(this.loadDataFromServer, this.props.dataInterval);
  },
  render: function() {
   return (<div>
      <DataEngine data={this.state.data} ref="me"/>
	  </div>
    );
  }
});
ReactDOM.render(
  <Receiver url="api/itemsdata.json" dataInterval={2000}/>,
  document.getElementById('content')
);