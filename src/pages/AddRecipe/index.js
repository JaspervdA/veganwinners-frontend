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
  Toast,
  TextInput,
  FormField,
  Title,
  NumberInput
} from "grommet";
import Dropzone from "react-dropzone";
import request from "superagent";

const recipeTypes = [
  "Voorgerecht",
  "Bijgerecht",
  "Hoofdgerecht",
  "Dessert",
  "Soep",
  "Saus"
];

const CLOUDINARY_UPLOAD_PRESET =;
const CLOUDINARY_UPLOAD_URL =; 

class AddRecipe extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: false,
      recipeType: undefined,
      uploadedFileCloudinaryUrl: ""
    };
  }

  sendRecipeToDb() {
    this.setState({
      test: true
    });
  }

  onSubmit(data) {
    alert("Je recept is succesvol opgestuurd.");
    console.log(data);
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
                  value={this.state.recipeType}
                  onChange={e => this.setState({ recipeType: e.option })}
                  options={recipeTypes}
                />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{"Bereidingstijd"}</Title>}
            right={
              <FormField>
                <TextInput id="item1" defaultValue="" name="bereidingstijd" />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{"Aantal personen"}</Title>}
            right={<NumberInput value={this.state.numPeople} />}
          />
          <DuoRow
            left={<Title>{"Ingrediënten"}</Title>}
            right={<IngredientInput />}
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
                <img src={this.state.uploadedFileCloudinaryUrl} />
              </div>
            )}
          </div>
          <Footer pad={{ vertical: "medium" }}>
            <Button label="Submit" type="submit" primary={true} />
          </Footer>
        </Form>
      </Box>
    );
  }
}

export default AddRecipe;
