import React from "react";
import DuoRow from "../../components/DuoRow";
import IngredientInput from "../../components/IngredientInput";
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
  Image
} from "grommet";
import Dropzone from "react-dropzone";
import request from "superagent";

const recipeTypes = [
  "Voorgerecht",
  "Bijgerecht",
  "Hoofdgerecht",
  "Dessert",
  "Soep",
  "Saus",
  "Lunch"
];

const CLOUDINARY_UPLOAD_PRESET = "idcxycac";
const CLOUDINARY_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/dsu60ie3p/upload";

const INGREDIENTS = [
  {
    item: "Aubergine",
    quantity: "1 stuk"
  },
  {
    item: "Hard broodje",
    quantity: "4 stuks"
  }
];

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "Broodje gegrilde groente",
      instructions: "1. Snijd en gril de groenten.\n2. Beleg het broodje!",
      type: "Lunch",
      time: "15 minuten",
      people: 4,
      ingredients: INGREDIENTS,
      uploadedFileCloudinaryUrl: ""
    };
  }

  onSubmit = () => {
    console.log(this.state.title)
    fetch("http://veganwinners.com/api/recipes/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: this.state.title,
        instructions: this.state.instructions,
        img: this.state.uploadedFileCloudinaryUrl,
        type: this.state.type,
        time: this.state.time,
        people: this.state.people,
        ingredients: this.state.ingredients
      })
    })
    .then(response => response.json())
    .then(data =>
      console.log(data)
    );
  }

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field("upload_preset", CLOUDINARY_UPLOAD_PRESET)
      .field("file", file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== "") {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  updateIngredientList(latestList) {
    this.setState({
      ingredients: latestList
    });
  }

  render() {
    return (
      <Box pad="medium">
        <Form plain={true} onSubmit={this.onSubmit}>
          <Header>
            <Heading>Recept Toevoegen</Heading>
          </Header>
          <DuoRow
            left={<Title>{"Soort gerecht"}</Title>}
            right={
              <FormField>
                <Select
                  value={this.state.type}
                  onChange={event => this.setState({ type: event.value })}
                  options={recipeTypes}
                />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{"Bereidingstijd"}</Title>}
            right={
              <FormField help="bv. 30 minuten">
                <TextInput
                  onSelect={suggestion => {
                    this.setState({ time: suggestion });
                    console.log(suggestion);
                  }}
                />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{"Aantal personen"}</Title>}
            right={<NumberInput value={this.state.people} />}
          />
          <DuoRow
            left={<Title>{"Ingrediënten"}</Title>}
            right={
              <IngredientInput
                updateIngredientList={this.updateIngredientList}
              />
            }
          />
          <DuoRow
            left={<Title>{"Bereidingswijze"}</Title>}
            right={
              <FormField>
                <textarea rows="8" cols="50" />
              </FormField>
            }
          />
          <Dropzone
            multiple={false}
            accept="image/*"
            onDrop={this.onImageDrop.bind(this)}
          >
            <p>Drop an image or click to select a file to upload.</p>
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
          <Button label="test" primary={true} onClick={this.onSubmit} />
          <Footer pad={{ vertical: "medium" }}>
            <Button label="Submit" type="submit" primary={true} />
          </Footer>
        </Form>
      </Box>
    );
  }
}

export default AddRecipe;
