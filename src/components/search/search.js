import React from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import ImageResults from "../image-results/image-results";

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchQuery: "",
      amount: 15,
      apiUrl: "https://pixabay.com/api",
      apiKey: "9138307-82e8df3ba7878d43b449f041d",
      images: []
    };
  }
  onAmountChange = (e, index, value) => {
    this.setState({ amount: value });
  };
  onQueryChange = e => {
    const { value } = e.target;
    this.setState({ [e.target.name]: value }, () => {
      if (value === "") {
        this.setState({ images: [] });
      } else {
        this.fetchData();
      }
    });
  };
  fetchData = () => {
    fetch(
      `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchQuery}&image_type=photo&per_page=${
        this.state.amount
      }&safeSearch=true`
    )
      .then(resp => resp.json())
      .then(resp => this.setState({ images: resp.hits }))
      .catch(err => console.error(err));
  };
  render() {
    const { searchQuery, amount, images } = this.state;
    return (
      <div>
        <TextField
          name="searchQuery"
          value={searchQuery}
          onChange={this.onQueryChange}
          floatingLabelText="Search For Images"
          fullWidth
        />
        <br />
        <SelectField name="amount" floatingLabelText="Amount" value={amount} onChange={this.onAmountChange}>
          <MenuItem value={5} primaryText="5" />
          <MenuItem value={10} primaryText="10" />
          <MenuItem value={15} primaryText="15" />
          <MenuItem value={30} primaryText="30" />
          <MenuItem value={50} primaryText="50" />
        </SelectField>
        <br />
        {this.state.images.length > 0 && <ImageResults images={images} />}
      </div>
    );
  }
}

export default Search;
