import React from 'react';
import DuoRow from '../../components/DuoRow';
import IngredientInput from '../../components/IngredientInput';
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
  Image
} from 'grommet';
import Dropzone from 'react-dropzone';
import request from 'superagent';

const recipeTypes = [
  'Voorgerecht',
  'Bijgerecht',
  'Hoofdgerecht',
  'Dessert',
  'Soep',
  'Saus',
  'Lunch'
];

const CLOUDINARY_UPLOAD_PRESET = 'idcxycac';
const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/dsu60ie3p/upload';

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
      ingredients: [],
      uploadedFileCloudinaryUrl: '',
      check: true,
      ownerCheck: true,
      titleCheck: true,
      instructionsCheck: true,
      typeCheck: true,
      timeCheck: true,
      ingredientsCheck: true,
      cloudinaryCheck: true
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
      this.state.cloudinaryCheck &&
      this.state.ownerCheck
    ) {
      this.submitData();
    } else {
      alert('Je hebt niet alles ingevuld.');
    }
  };

  submitData = async () => {
    await fetch('http://veganwinners.com/api/recipes/add', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        owner: this.state.owner,
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
      .then(data => {
        console.log(data);
      });
    alert(
      'Bedankt voor je heerlijke recept! Binnen 5 werkdagen zal hij op de site verschijnen.'
    );

    window.location.reload();
  };

  updateIngredients = newIngredients => {
    this.setState({ ingredients: newIngredients });
  };

  onImageDrop(files) {
    this.setState({
      uploadedFile: files[0]
    });

    this.handleImageUpload(files[0]);
  }

  handleImageUpload(file) {
    let upload = request
      .post(CLOUDINARY_UPLOAD_URL)
      .field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
      .field('file', file);

    upload.end((err, response) => {
      if (err) {
        console.error(err);
      }

      if (response.body.secure_url !== '') {
        this.setState({
          uploadedFileCloudinaryUrl: response.body.secure_url
        });
      }
    });
  }

  checkFields() {
    if (this.state.title === undefined || '') {
      this.setState({ titleCheck: false });
    }
    if (this.state.type === undefined || '') {
      this.setState({ typeCheck: false });
    }
    if (this.state.time === undefined || '') {
      this.setState({ timeCheck: false });
    }
    if (this.state.owner === undefined || '') {
      this.setState({ ownerCheck: false });
    }
    if (this.state.ingredients.length === 0) {
      this.setState({ ingredientsCheck: false });
    } else {
      this.setState({ ingredientsCheck: true });
    }
    if (this.state.instructions === undefined || '') {
      this.setState({ instructionsCheck: false });
    }
    if (this.state.uploadedFileCloudinaryUrl === '') {
      this.setState({ cloudinaryCheck: false });
    } else {
      this.setState({ cloudinaryCheck: true });
    }
  }

  render() {
    return (
      <Box pad="medium">
        <Form plain={true}>
          <Header>
            <Heading>Recept Toevoegen</Heading>
          </Header>
          <DuoRow
            left={<Title>{'De chef'}</Title>}
            right={
              <FormField
                error={
                  this.state.ownerCheck ? undefined : 'Schrijf je naam hier'
                }
              >
                <TextInput
                  value={this.state.owner}
                  placeHolder={'Hoe heet je?'}
                  onDOMChange={e =>
                    this.setState({ owner: e.target.value, ownerCheck: true })
                  }
                />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{'Titel'}</Title>}
            right={
              <FormField
                error={this.state.titleCheck ? undefined : 'Voeg een titel toe'}
              >
                <TextInput
                  value={this.state.title}
                  placeHolder={'Titel van het gerecht'}
                  onDOMChange={e =>
                    this.setState({ title: e.target.value, titleCheck: true })
                  }
                />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{'Soort gerecht'}</Title>}
            right={
              <FormField error={this.state.typeCheck ? undefined : 'Error'}>
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
            left={<Title>{'Bereidingstijd'}</Title>}
            right={
              <FormField
                error={
                  this.state.timeCheck
                    ? undefined
                    : 'Voeg een bereidingstijd toe'
                }
              >
                <TextInput
                  value={this.state.time}
                  placeHolder={'30 minuten'}
                  onDOMChange={e =>
                    this.setState({ time: e.target.value, timeCheck: true })
                  }
                />
              </FormField>
            }
          />
          <DuoRow
            left={<Title>{'Aantal personen'}</Title>}
            right={
              <NumberInput
                value={this.state.people}
                min={1}
                onChange={e => this.setState({ people: e.target.value })}
              />
            }
          />
          <DuoRow
            left={<Title>{'Ingrediënten'}</Title>}
            right={
              <IngredientInput updateIngredients={this.updateIngredients} />
            }
          />
          <DuoRow
            left={<Title>{'Bereidingswijze'}</Title>}
            right={
              <FormField
                error={
                  this.state.instructionsCheck
                    ? undefined
                    : 'Voeg een bereidingstijd toe'
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
          <DuoRow
            left={<Title>{'Foto'}</Title>}
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
                    {this.state.cloudinaryCheck ? (
                      <Paragraph>
                        Drop je foto hier of klik om te uploaden!
                      </Paragraph>
                    ) : (
                      <div>
                        <Paragraph>
                          Drop je foto hier of klik om te uploaden!
                        </Paragraph>
                        <Paragraph style={{ color: 'red' }}>
                          Vergeet niet je foto te uploaden!
                        </Paragraph>
                      </div>
                    )}
                  </Box>
                </Dropzone>
                <div>
                  {this.state.uploadedFileCloudinaryUrl === '' ? null : (
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
          <Footer pad={{ vertical: 'medium' }}>
            <Button label="Submit" primary={true} onClick={this.onSubmit} />
          </Footer>
        </Form>
      </Box>
    );
  }
}

export default AddRecipe;
