// This store manages ALFRESCO data!
import _ from 'lodash'

export const getters = {
  beetleEras() {
    return ['1988-2017', '2010-2039', '2040-2069', '2070-2099']
  },
  beetleModels() {
    return ['Daymet', 'NCAR-CCSM4', 'GFDL-ESM2M', 'HadGEM2-ES', 'MRI CGCM3']
  },
  beetleScenarios() {
    return ['Historical', 'RCP 4.5', 'RCP 8.5']
  },
  beetleSnowpacks() {
    return ['Low Snowpack', 'Medium Snowpack']
  },
  beetleRisks() {
    return [
      {
        label: 'Not modeled or no data',
        color: '#dddddd',
        interpretation:
          'This pixel was not modeled or is not included in the dataset',
      },
      {
        label: 'Low Risk',
        color: '#248000',
        interpretation: 'Low risk of spruce beetle damage.',
      },
      {
        label: 'Moderate Risk',
        color: '#f7bd00',
        interpretation: 'Moderate risk of spruce beetle damage.',
      },
      {
        label: 'High Risk',
        color: '#8c7453',
        interpretation: 'High risk of spruce beetle damage.',
      },
    ]
  },
}
