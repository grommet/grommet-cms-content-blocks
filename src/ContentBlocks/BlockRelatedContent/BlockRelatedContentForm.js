import React, { Component, PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Form from 'grommet/components/Form';
import FormFields from 'grommet/components/FormFields';
import FormField from 'grommet/components/FormField';
import Button from 'grommet/components/Button';
import Footer from 'grommet/components/Footer';
import AddIcon from 'grommet/components/icons/base/Add';
import TrashIcon from 'grommet/components/icons/base/Trash';

export class RelatedContentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: props.data || [{ href: "", title: "", content: "" }],
      label: props.label || "Related Content"
    };

    this.onDataChange = this.onDataChange.bind(this);
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onDataChange(e,i) {
    const { name , value } = e.target;
    const onchangeVal = [...this.state.data];
    onchangeVal[i][name] = value;
    this.setState({data: onchangeVal});
    if (this.props.onChange) {
      this.props.onChange(e);
    }
  }

  onAdd() {
    this.setState({data: [...this.state.data, { href: "", title: "", content: "" }]});
  }

  onDelete(i) {
    const deleteVal = [...this.state.data];
    deleteVal.splice(i,1)
    this.setState({ data: deleteVal });
  }

  onSubmit(event) {
    event.preventDefault();
    const formData = Object.assign({}, this.state);
    this.props.onSubmit(formData);
  }

  render() {
    const { data, label } = this.state;
    return (
      <Box>
        <fieldset>
          <FormField label="label" help="Enter a label" htmlFor="label">
            <input
              name="label"
              value={label}
              onChange={(e) => this.onDataChange(e, 0)}
              placeholder="label"
            />
          </FormField>
        </fieldset>
        {data.length > 0 &&
          data.map((val, i) => (
            <Box colorIndex="light-2" pad="medium">
              <Form>
                <FormFields>
                  <fieldset>
                    <FormField label="href" help="Enter an href" htmlFor="href">
                      <input
                        name="href"
                        value={val.href}
                        onChange={(e) => this.onDataChange(e, i)}
                        placeholder="href"
                      />
                    </FormField>
                    <FormField
                      label="title"
                      help="Enter a title"
                      htmlFor="title"
                    >
                      <input
                        name="title"
                        value={val.title}
                        onChange={(e) => this.onDataChange(e, i)}
                        placeholder="Title"
                      />
                    </FormField>
                    <FormField
                      label="content"
                      help="Enter content"
                      htmlFor="content"
                    >
                      <input
                        name="content"
                        value={val.content}
                        onChange={(e) => this.onDataChange(e, i)}
                        placeholder="Content"
                      />
                    </FormField>
                  </fieldset>
                </FormFields>
                <Footer pad="medium">
                  <Box direction="row" align="center">
                    <Button icon={<AddIcon />} onClick={this.onAdd} pad="small">
                      Add
                    </Button>
                    <Box pad="small"></Box>
                    {data.length > 1 && (
                      <Button
                        icon={<TrashIcon />}
                        onClick={() => this.onDelete(i)}
                        pad="small"
                      >
                        Delete
                      </Button>
                    )}
                  </Box>
                </Footer>
              </Form>
            </Box>
          ))}
        <Footer pad="medium">
          <Button
            onClick={this.onSubmit}
            primary={false}
            type="submit"
            label="Done"
          />
        </Footer>
      </Box>
    );
  }
}

RelatedContentForm.propTypes = {
  data: PropTypes.array,
  onDataChange: PropTypes.func,
  onAdd: PropTypes.func,
  onDelete: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default RelatedContentForm;
