import React, { createRef } from 'react';
import Box from "grommet/components/Box";
import Button from "grommet/components/Button";
import Columns from "grommet/components/Columns";
import Anchor from "grommet/components/Anchor";
import TextInput from "grommet/components/TextInput";
import Select from "grommet/components/Select";
import Paragraph from "grommet/components/Paragraph";
import Label from "grommet/components/Label";
import CaretBack from 'grommet/components/icons/base/CaretBack';
import CaretNext from 'grommet/components/icons/base/CaretNext';
import Spinning from "grommet/components/icons/Spinning";
import { recipeTypes } from "./RecipeTypes";
import RecipeCard from "../RecipeCard";

let MAX_RECIPES_ON_PAGE = 6
let PREV = "....... Vorige"
let NEXT = ".. Volgende"

class RecipeList extends React.Component {
  constructor() {
    super();

    this.state = {
      isLoading: true,
      recipes: [],
      latest3recipes: [],
      recipesOnPage: [],
      search: '',
      type: '',
      page: 1
    };

    this.scroller = createRef()
  }

  getRecipes() {
    let searchField = this.state.search.trim() === '' ? '*' : this.state.search
    let typeField = this.state.type === '' ? 'Alle' : this.state.type
    fetch(`http://veganwinners.com/api/recipes/approved/${searchField}/typed/${typeField}`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          recipes: data.data,
          recipesOnPage: data.data.slice(0, MAX_RECIPES_ON_PAGE),
          page: 1
        })
      );
  }

  getAllRecipes() {
    fetch(`http://veganwinners.com/api/recipes/approved/*/typed/Alle`)
      .then(response => response.json())
      .then(data =>
        this.setState({
          recipes: data.data.slice(3,),
          latest3recipes: data.data.slice(0,3),
          recipesOnPage: data.data.slice(3, 3 + MAX_RECIPES_ON_PAGE),
          isLoading: false
        })
      );
  }

  updatePageAndRecipesOnPage(direction, scroll) {
    let currentPage = this.state.page

    if (direction == -1) {
      if (currentPage > 1) { 
        this.setState({ 
          page: currentPage - 1,
          recipesOnPage: this.state.recipes.slice((currentPage - 2) * MAX_RECIPES_ON_PAGE, (currentPage - 1) * MAX_RECIPES_ON_PAGE), 
        })
        if (scroll) window.scrollTo(0, this.scroller.current.offsetTop)  
      } 
    }

    if (direction == 1) {
      if (currentPage < this.state.recipes.length / MAX_RECIPES_ON_PAGE) { 
        this.setState({ 
          page: currentPage + 1,
          recipesOnPage: this.state.recipes.slice((currentPage) * MAX_RECIPES_ON_PAGE, (currentPage + 1) * MAX_RECIPES_ON_PAGE), 
        })
        if (scroll) window.scrollTo(0, this.scroller.current.offsetTop)  
      } 
    }
  }

  componentDidMount() {
    this.getAllRecipes();
  }

  render() {
    return (
      <Box>
        <Label align="center"><i>Zin in iets lekkers?</i><br/>Dit zijn de 3 nieuwste recepten op Veganwinners!</Label>
        <Columns size="medium" maxCount={3}>
          {this.state.isLoading && <Spinning />}
          {!this.state.isLoading &&
            this.state.latest3recipes.map(recipe => (
              <RecipeCard recipe={recipe}/>
            ))}
        </Columns>
        <Label align="center">Of zoek in al onze heerlijke recepten!</Label>
        <Box align="center" pad="small">
          <Box size="medium">
            <Select 
              placeHolder='optioneel: soort gerecht'
              options={["Alle"].concat(recipeTypes)}
              value={this.state.type}
              onChange={e => { this.setState({ type: e.value })}}
            />
          </Box>
          <Box size="xsmall" pad="small" />
          <Box size="medium">
            <TextInput
              placeHolder='optioneel: vrij zoeken'
              value={this.state.search}
              onDOMChange={e => { this.setState({ search: e.target.value }) }}
              onKeyPress={event => { if (event.key === 'Enter') this.getRecipes() }}
            />
          </Box>
          <div ref={this.scroller}/>
          <Box size="xsmall" pad="small" />
          <Button
            label="Zoeken"
            primary={true}
            onClick={() => this.getRecipes()}
          />
          <Box size="xsmall" pad="small" />
          <Anchor icon={<CaretBack/>} label={PREV} primary={true} onClick={() => this.updatePageAndRecipesOnPage(-1, false)}/>
          <Anchor icon={<CaretNext/>} label={NEXT} primary={true} onClick={() => this.updatePageAndRecipesOnPage(1, false)}/>
        </Box>
        <Columns size="medium" align ="center" justify="center" maxCount={3}>
          {this.state.isLoading && <Spinning />}
          {!this.state.isLoading && this.state.recipes.length == 0 && 
              <Paragraph><i>Geen resultaten, zoek iets anders...</i></Paragraph>}
          {!this.state.isLoading && this.state.recipesOnPage.map(recipe => (
              <RecipeCard recipe={recipe}/>))}
        </Columns>
        <Box align="center" pad="small">
          <Anchor icon={<CaretBack/>} label={PREV} primary={true} onClick={() => this.updatePageAndRecipesOnPage(-1, true)}/>
          <Anchor icon={<CaretNext/>} label={NEXT} primary={true} onClick={() => this.updatePageAndRecipesOnPage(1, true)}/>
        </Box>
      </Box>
    );
  }
}

export default RecipeList;
