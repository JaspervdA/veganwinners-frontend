import React from "react";
import DuoRow from "../../components/DuoRow";
import Ingredient from "../../components/Ingredient";
import {
  Box,
  Form,
  Header,
  Heading,
  Footer,
  Button,
  Select,
  TextInput,
  FormField,
  Title,
  NumberInput,
  Paragraph,
  Image,
  RadioButton
} from "grommet";
import Dropzone from "react-dropzone";
import request from "superagent";
import Spinning from "grommet/components/icons/Spinning";
import {recipeTypes} from "../../components/RecipeList/RecipeTypes";

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: undefined,
      title: undefined,
      instructions: undefined,
      type: undefined,
      time: undefined,
      people: 4,
      vegan: true,
      ingredients: [],
      uploadedFileCloudinaryUrl: "",
      forbiddenIngredients: [],
      suggestedIngredients: [],
      check: true,
      ownerCheck: true,
      titleCheck: true,
      instructionsCheck: true,
      typeCheck: true,
      timeCheck: true,
      ingredientsCheck: true,
      imageCheck: true,
      foodCheck: true,
      isLoading: false
    };
  }

  onSubmit = async () => {
    await this.checkFields();

    if (
      this.state.titleCheck &&
      this.state.typeCheck &&
      this.state.timeCheck &&
      this.state.ingredientsCheck &&
      this.state.instructionsCheck &&
      this.state.imageCheck &&
      this.state.ownerCheck
    ) {
      await this.setState({isLoading: true})
      this.submitData();
    } else {
      alert("Je hebt niet alles ingevuld. Heb je wel ingredienten toegevoegd?");
    }
    await this.setState({isLoading:false})
  };

  submitData = async () => {
    fetch("http://veganwinners.com/api/recipes/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        owner: this.state.owner,
        title: this.state.title,
        instructions: this.state.instructions,
        img: this.state.uploadedFileCloudinaryUrl,
        type: this.state.type,
        time: this.state.time,
        people: this.state.people,
        vegan: this.state.vegan,
        ingredients: this.state.ingredients.filter(x => x !== {})
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data.code === 200) {
          alert(
            "Bedankt voor je recept! Veganwinners zal zo snel mogelijk je recept keuren ;)"
          );
          window.location.reload();
        } else {
          alert(data.message);
        }
      });
  };

  handleChange = async (ingredient, index) => {
    const ingredients = this.state.ingredients;
    ingredients[index] = ingredient;

    await this.setState({
      ingredients
    });
  };

  addIngredient(item, quantity) {
    let currentItems = this.state.ingredients.map(x => x.item)
    if (item === undefined || !currentItems.includes(item)){
      this.setState({
        ingredients: [
          ...this.state.ingredients,
          { item: item, quantity: quantity }
        ]
      });
    }
  }

  removeIngredient() {
    if (this.state.ingredients.length > 0) {
      this.setState({
        ingredients: this.state.ingredients.slice(0, -1)
      });
    }
  }

  onImageDrop(files) {
    this.setState({
      isLoading: true
    })
    let upload = request
      .post("http://veganwinners.com/api/classify/upload-image")
      .field("img", files[0]);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.data.food === false) {
        this.setState({
          imageCheck: false,
          foodCheck: false,
          uploadedFileCloudinaryUrl: ""
        });
      } else if (response.body.data.food === true) {
        this.setState({
          uploadedFile: files[0],
          uploadedFileCloudinaryUrl: response.body.data.url,
          imageCheck: true,
          foodCheck: true,
          forbiddenIngredients: response.body.data.forbidden,
          suggestedIngredients: response.body.data.used
        });
      }
      this.setState({
        isLoading: false
      })
    });
  }

  checkFields() {
    if (this.state.title === undefined || this.state.title === "") {
      this.setState({ titleCheck: false });
    }
    if (this.state.type === undefined || this.state.type === "") {
      this.setState({ typeCheck: false });
    }
    if (this.state.time === undefined || this.state.time === "") {
      this.setState({ timeCheck: false });
    }
    if (this.state.owner === undefined || this.state.owner === "") {
      this.setState({ ownerCheck: false });
    }
    if (this.state.ingredients.length === 0) {
      this.setState({ ingredientsCheck: false });
    } else {
      this.setState({ ingredientsCheck: true });
    }
    if (
      this.state.instructions === undefined ||
      this.state.instructions === ""
    ) {
      this.setState({ instructionsCheck: false });
    }
    if (this.state.uploadedFileCloudinaryUrl === "") {
      this.setState({ imageCheck: false });
    } else {
      this.setState({ imageCheck: true });
    }
  }

  render() {
    return (
      <Box pad="medium">
        <Form plain={true}>
          <Header>
            <Heading>Recept Toevoegen</Heading>
          </Header>
          {this.state.foodCheck ? null : (
            <Paragraph style={{ color: "red" }}>
              Hee, houd ons niet voor de gek! <br /> <br /> Wij zien heus wel
              dat er geen eten op dat plaatje staat...
            </Paragraph>
          )}
          
          {this.state.isLoading && <Spinning />}
          {!this.state.isLoading &&
          <div>
            
            <DuoRow
              left={<Title>{"Foto"}</Title>}
              right={
                <div>
                  <Dropzone
                    multiple={false}
                    accept="image/*"
                    onDrop={this.onImageDrop.bind(this)}
                  >
                    <Box
                      margin="medium"
                      justify="center"
                      align="center"
                      size="full"
                    >
                      {this.state.imageCheck ? (
                        <Paragraph>
                          Drop je foto hier of klik om te uploaden!
                        </Paragraph>
                      ) : (
                        <div>
                          <Paragraph>
                            Drop je foto hier of klik om te uploaden!
                          </Paragraph>
                          <Paragraph style={{ color: "red" }}>
                            Vergeet niet je foto te uploaden!
                          </Paragraph>
                        </div>
                      )}
                    </Box>
                  </Dropzone>
                  <div>
                    {this.state.uploadedFileCloudinaryUrl === "" ? null : (
                      <div>
                        <p>{this.state.uploadedFile.name}</p>
                        <Image
                          src={this.state.uploadedFileCloudinaryUrl}
                          size="medium"
                        />
                      </div>
                    )}
                  </div>
                </div>
              }
            />
            { this.state.forbiddenIngredients.length < 1 ? null : (
            <Box pad="small">
              <Paragraph style={{ color: "green" }}>
                Weet je zeker dat er niet iets van{" "}
                {this.state.forbiddenIngredients.join(", ")} op deze foto staat?
              </Paragraph>
            </Box>
          ) }
            <DuoRow
              left={<Title>{"De chef"}</Title>}
              right={
                <FormField
                  error={
                    this.state.ownerCheck ? undefined : "Schrijf je naam hier"
                  }
                >
                  <TextInput
                    value={this.state.owner}
                    placeHolder={"Hoe heet je?"}
                    onDOMChange={e =>
                      this.setState({ owner: e.target.value, ownerCheck: true })
                    }
                  />
                </FormField>
              }
            />
            <DuoRow
              left={<Title>{"Titel"}</Title>}
              right={
                <FormField
                  error={this.state.titleCheck ? undefined : "Voeg een titel toe"}
                >
                  <TextInput
                    value={this.state.title}
                    placeHolder={"Titel van het gerecht"}
                    onDOMChange={e =>
                      this.setState({ title: e.target.value, titleCheck: true })
                    }
                  />
                </FormField>
              }
            />
            <DuoRow
              left={<Title>{"Soort gerecht"}</Title>}
              right={
                <FormField error={this.state.typeCheck ? undefined : "Error"}>
                  <Select
                    value={this.state.type}
                    onChange={e =>
                      this.setState({ type: e.value, typeCheck: true })
                    }
                    options={recipeTypes}
                  />
                </FormField>
              }
            />
            <DuoRow
              left={<Title>{"Bereidingstijd"}</Title>}
              right={
                <FormField
                  error={
                    this.state.timeCheck
                      ? undefined
                      : "Voeg een bereidingstijd toe"
                  }
                >
                  <TextInput
                    value={this.state.time}
                    placeHolder={"30 minuten"}
                    onDOMChange={e =>
                      this.setState({ time: e.target.value, timeCheck: true })
                    }
                  />
                </FormField>
              }
            />
            <DuoRow
              left={<Title>{"Aantal personen"}</Title>}
              right={
                <NumberInput
                  value={this.state.people}
                  min={1}
                  onChange={e => this.setState({ people: e.target.value })}
                />
              }
            />
            <DuoRow
              left={<Title>{"Mijn gerecht is"}</Title>}
              right={
                <Box>
                  <RadioButton id='veganistisch'
                    name='veganistisch'
                    label='veganistisch'
                    checked={this.state.vegan}
                    onChange={e => this.setState({ vegan: true})} />
                  <RadioButton id='vegetarisch'
                    name='vegetarisch'
                    label='vegetarisch'
                    checked={!this.state.vegan}
                    onChange={e => this.setState({ vegan: false})} />
                </Box>
              }
            />
            {this.state.suggestedIngredients.length > 0 ? (
            <DuoRow
              left={<Title>{"Hiervan iets gebruikt?"}</Title>}
              right={
                <Select
                  inline={true}
                  multiple={true}
                  options={this.state.suggestedIngredients}
                  onSearch={false}
                  value={this.state.ingredients.map(x => x.item)}
                  onChange={e => this.addIngredient(e.option, undefined)}
                />
              }
            />
          ) : null}
          <DuoRow
            left={<Title>{"Ingrediënten"}</Title>}
            right={
              <Box direction="column">
                {[...Array(this.state.ingredients.length).keys()].map(
                  number => (
                    <Ingredient
                      item={this.state.ingredients[number].item}
                      quantity={this.state.ingredients[number].quantity}
                      key={number.toString()}
                      id={number}
                      handleChange={this.handleChange}
                    />
                  )
                )}
                <Box
                  direction="row"
                  pad={{
                    horizontal: "none",
                    vertical: "none",
                    between: "small"
                  }}
                >
                  <Button
                    label="Extra ingredient"
                    primary={true}
                    onClick={() => this.addIngredient(undefined, undefined)}
                  />
                  <Button
                    label="Ingredient minder"
                    primary={true}
                    onClick={() => this.removeIngredient()}
                  />
                </Box>
              </Box>
            }
          />
          <DuoRow
            left={<Title>{"Bereidingswijze"}</Title>}
            right={
              <FormField
                error={
                  this.state.instructionsCheck
                    ? undefined
                    : "Voeg een bereidingswijze toe"
                }
              >
                <textarea
                  value={this.state.instructions}
                  rows="8"
                  cols="50"
                  onChange={e =>
                    this.setState({
                      instructions: e.target.value,
                      instructionsCheck: true
                    })
                  }
                />
              </FormField>
            }
          />
          <Footer pad={{ vertical: "medium" }}>
            <Button label="Sturen" primary={true} onClick={this.onSubmit} />
          </Footer>
          </div>
          }
          
        </Form>
      </Box>
    );
  }
}

export default AddRecipe;
