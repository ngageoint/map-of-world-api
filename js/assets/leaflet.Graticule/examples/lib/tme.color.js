/**
 * @fileOverview This file includes color schemes developed by Cynthia Brewer (http://colorbrewer.org/).
 * Copyright (c) 2002-09 Cynthia Brewer, Mark Harrower, and The Pennsylvania State University. 
 * The color schemes are distributed under the Apache License, Version 2.0:
 * http://www.apache.org/licenses/LICENSE-2.0
 *  
 * @author <a href="mailto:bjorn@thematicmapping.org">Bjorn Sandvik</a> (thematicmapping.org)
 * 
 * @example
 * var colors = tme.color.BuGn[5]; // Returns an array containing the 5-class Blue-Green color scheme.   
 */


/** @namespace Namespace for Thematic Mapping Engine classes and functions. */
var tme = tme || {};

/**
 *  @class Holds color schemes from ColorBrewer (http://colorbrewer.org/).
 */
tme.color = {

  /**
   * @type Blue-Green sequential
   */
  BuGn: {
    3: ['E5F5F9','99D8C9','2CA25F'],
    4: ['EDF8FB','B2E2E2','66C2A4','238B45'],   
    5: ['EDF8FB','B2E2E2','66C2A4','2CA25F','006D2C'],   
    6: ['EDF8FB','CCECE6','99D8C9','66C2A4','2CA25F','006D2C'],
    7: ['EDF8FB','CCECE6','CCECE6','66C2A4','41AE76','238B45','005824'],   
    8: ['F7FCFD','E5F5F9','CCECE6','99D8C9','66C2A4','41AE76','238B45','005824'],   
    9: ['F7FCFD','E5F5F9','CCECE6','99D8C9','66C2A4','41AE76','238B45','006D2C','00441B']
  },
  
  /**
   * @type Blue-Purple sequential
   */  
  BuPu: {
    3: ['E0ECF4','9EBCDA','8856A7'],
    4: ['EDF8FB','B3CDE3','8C96C6','88419D'],   
    5: ['EDF8FB','B3CDE3','8C96C6','8856A7','810F7C'],   
    6: ['EDF8FB','BFD3E6','9EBCDA','8C96C6','8856A7','810F7C'],
    7: ['EDF8FB','BFD3E6','9EBCDA','8C96C6','8C6BB1','88419D','6E016B'],   
    8: ['F7FCFD','E0ECF4','BFD3E6','9EBCDA','8C96C6','8C6BB1','88419D','6E016B'],   
    9: ['F7FCFD','E0ECF4','BFD3E6','9EBCDA','8C96C6','8C6BB1','88419D','810F7C','4D004B']
  },
  
  /**
   * @type Green-Blue sequential
   */    
  GnBu: {
    3: ['E0F3DB','A8DDB5','43A2CA'],
    4: ['F0F9E8','BAE4BC','7BCCC4','2B8CBE'],   
    5: ['F0F9E8','BAE4BC','7BCCC4','43A2CA','0868AC'],   
    6: ['F0F9E8','CCEBC5','A8DDB5','7BCCC4','43A2CA','0868AC'],
    7: ['F0F9E8','CCEBC5','A8DDB5','7BCCC4','4EB3D3','2B8CBE','08589E'],   
    8: ['F7FCF0','E0F3DB','CCEBC5','A8DDB5','7BCCC4','4EB3D3','2B8CBE','08589E'],   
    9: ['F7FCF0','E0F3DB','CCEBC5','A8DDB5','7BCCC4','4EB3D3','2B8CBE','0868AC','084081']
  },
  
  /**
   * @type Orange-Red sequential
   */    
  OrRd: {
    3: ['FEE8C8','FDBB84','E34A33'],
    4: ['FEF0D9','FDCC8A','FC8D59','D7301F'],   
    5: ['FEF0D9','FDCC8A','FC8D59','E34A33','B30000'],   
    6: ['FEF0D9','FDD49E','FDBB84','FC8D59','E34A33','B30000'],
    7: ['FEF0D9','FDD49E','FDBB84','FC8D59','EF6548','D7301F','990000'],   
    8: ['FFF7EC','FEE8C8','FDD49E','FDBB84','FC8D59','EF6548','D7301F','990000'],   
    9: ['FFF7EC','FEE8C8','FDD49E','FDBB84','FC8D59','EF6548','D7301F','B30000','7F0000']
  },
  
  /**
   * @type Purple-Blue sequential
   */    
  PuBu: {
    3: ['ECE7F2','A6BDDB','2B8CBE'],
    4: ['F1EEF6','BDC9E1','74A9CF','0570B0'],   
    5: ['F1EEF6','BDC9E1','74A9CF','2B8CBE','045A8D'],   
    6: ['F1EEF6','D0D1E6','A6BDDB','74A9CF','2B8CBE','045A8D'],
    7: ['F1EEF6','D0D1E6','A6BDDB','74A9CF','3690C0','0570B0','034E7B'],   
    8: ['FFF7FB','ECE7F2','D0D1E6','A6BDDB','74A9CF','3690C0','0570B0','034E7B'],   
    9: ['FFF7FB','ECE7F2','D0D1E6','A6BDDB','74A9CF','3690C0','0570B0','045A8D','023858']
  },
  
  /**
   * @type Purple-Blue-Green sequential
   */    
  PuBuGn: {
    3: ['ECE2F0','A6BDDB','1C9099'],
    4: ['F6EFF7','BDC9E1','67A9CF','02818A'],   
    5: ['F6EFF7','BDC9E1','67A9CF','1C9099','016C59'],   
    6: ['F6EFF7','D0D1E6','A6BDDB','67A9CF','1C9099','016C59'],
    7: ['F6EFF7','D0D1E6','A6BDDB','67A9CF','3690C0','02818A','016450'],   
    8: ['FFF7FB','ECE2F0','D0D1E6','A6BDDB','67A9CF','3690C0','02818A','016450'],   
    9: ['FFF7FB','ECE2F0','D0D1E6','A6BDDB','67A9CF','3690C0','02818A','016C59','014636']
  },
  
  /**
   * @type Purple-Red sequential
   */    
  PuRd: {
    3: ['E7E1EF','C994C7','DD1C77'],
    4: ['F1EEF6','D7B5D8','DF65B0','CE1256'],   
    5: ['F1EEF6','D7B5D8','DF65B0','DD1C77','980043'],   
    6: ['F1EEF6','D4B9DA','C994C7','DF65B0','DD1C77','980043'],
    7: ['F1EEF6','D4B9DA','C994C7','DF65B0','E7298A','CE1256','91003F'],   
    8: ['F7F4F9','E7E1EF','D4B9DA','C994C7','DF65B0','E7298A','CE1256','91003F'],   
    9: ['FFF7FB','ECE2F0','D0D1E6','A6BDDB','67A9CF','3690C0','02818A','016C59','014636']
  },
  
  /**
   * @type Red-Purple sequential
   */    
  RdPu: {
    3: ['FDE0DD','FA9FB5','C51B8A'],
    4: ['FEEBE2','FBB4B9','F768A1','AE017E'],   
    5: ['FEEBE2','FBB4B9','F768A1','C51B8A','7A0177'],   
    6: ['FEEBE2','FCC5C0','FA9FB5','F768A1','C51B8A','7A0177'],
    7: ['FEEBE2','FCC5C0','FA9FB5','F768A1','DD3497','AE017E','7A0177'],   
    8: ['FFF7F3','FDE0DD','FCC5C0','FA9FB5','F768A1','DD3497','AE017E','7A0177'],   
    9: ['FFF7F3','FDE0DD','FCC5C0','FA9FB5','F768A1','DD3497','AE017E','7A0177','49006A']
  },
  
  /**
   * @type Yellow-Green sequential
   */    
  YlGn: {
    3: ['F7FCB9','ADDD8E','31A354'],
    4: ['FFFFCC','C2E699','78C679','238443'],   
    5: ['FFFFCC','C2E699','78C679','31A354','006837'],   
    6: ['FFFFCC','D9F0A3','ADDD8E','78C679','31A354','006837'],
    7: ['FFFFCC','D9F0A3','ADDD8E','78C679','41AB5D','238443','005A32'],   
    8: ['FFFFE5','F7FCB9','D9F0A3','ADDD8E','78C679','41AB5D','238443','005A32'],   
    9: ['FFFFE5','F7FCB9','D9F0A3','ADDD8E','78C679','41AB5D','238443','006837','004529']
  },
  
  /**
   * @type Yellow-Green-Blue
   */    
  YlGnBu: {
    3: ['EDF8B1','7FCDBB','2C7FB8'],
    4: ['FFFFCC','A1DAB4','41B6C4','225EA8'],   
    5: ['FFFFCC','A1DAB4','41B6C4','2C7FB8','253494'],   
    6: ['FFFFCC','C7E9B4','7FCDBB','41B6C4','2C7FB8','253494'],
    7: ['FFFFCC','C7E9B4','7FCDBB','41B6C4','1D91C0','225EA8','0C2C84'],   
    8: ['FFFFD9','EDF8B1','C7E9B4','7FCDBB','41B6C4','1D91C0','225EA8','0C2C84'],   
    9: ['FFFFD9','EDF8B1','C7E9B4','7FCDBB','41B6C4','1D91C0','225EA8','253494','081D58']
  },
  
  /**
   * @type Yellow-Orange-Brown
   */        
  YlOrBr: {
    3: ['FFF7BC','FEC44F','D95F0E'],
    4: ['FFFFD4','FED98E','FE9929','CC4C02'],
    5: ['FFFFD4','FED98E','FE9929','D95F0E','993404'],
    6: ['FFFFD4','FEE391','FEC44F','FE9929','D95F0E','993404'],
    7: ['FFFFD4','FEE391','FEC44F','FE9929','EC7014','CC4C02','8C2D04'],
    8: ['FFFFE5','FFF7BC','FEE391','FEC44F','FE9929','EC7014','CC4C02','8C2D04'],
    9: ['FFFFE5','FFF7BC','FEE391','FEC44F','FE9929','EC7014','CC4C02','993404','662506']
  },
  
  /**
   * @type Yellow-Orange-Red
   */  
  YlOrRd: {
    3: ['FFEDA0','FEB24C','F03B20'],
    4: ['FFFFB2','FECC5C','FD8D3C','E31A1C'],   
    5: ['FFFFB2','FECC5C','FD8D3C','F03B20','BD0026'],   
    6: ['FFFFB2','FED976','FEB24C','FD8D3C','F03B20','BD0026'],
    7: ['FFFFB2','FED976','FEB24C','FD8D3C','FC4E2A','E31A1C','B10026'],   
    8: ['FFFFCC','FFEDA0','FED976','FEB24C','FD8D3C','FC4E2A','E31A1C','B10026'],   
    9: ['FFFFCC','FFEDA0','FED976','FEB24C','FD8D3C','FC4E2A','E31A1C','BD0026','800026']
  },
  
  /**
   * @type Blues sequential
   */  
  Blues: {
    3: ['DEEBF7','9ECAE1','3182BD'],    
    4: ['EFF3FF','BDD7E7','6BAED6','2171B5'],    
    5: ['EFF3FF','BDD7E7','6BAED6','3182BD','08519C'],    
    6: ['EFF3FF','C6DBEF','9ECAE1','6BAED6','3182BD','08519C'],    
    7: ['EFF3FF','C6DBEF','9ECAE1','6BAED6','4292C6','2171B5','084594'],    
    8: ['F7FBFF','DEEBF7','C6DBEF','9ECAE1','6BAED6','4292C6','2171B5','084594'],    
    9: ['F7FBFF','DEEBF7','C6DBEF','9ECAE1','6BAED6','4292C6','2171B5','08519C','08306B']  
  },
  
  /**
   * @type Greens sequential
   */  
  Greens: {
    3: ['E5F5E0','A1D99B','31A354'],    
    4: ['EDF8E9','BAE4B3','74C476','238B45'],    
    5: ['EDF8E9','BAE4B3','74C476','31A354','006D2C'],    
    6: ['EDF8E9','C7E9C0','A1D99B','74C476','31A354','006D2C'],    
    7: ['EDF8E9','C7E9C0','A1D99B','74C476','41AB5D','238B45','005A32'],    
    8: ['F7FCF5','E5F5E0','C7E9C0','A1D99B','74C476','41AB5D','238B45','005A32'],    
    9: ['F7FCF5','E5F5E0','C7E9C0','A1D99B','74C476','41AB5D','238B45','006D2C','00441B']  
  },
  
  /**
   * @type Greys sequential
   */    
  Greys: {
    3: ['F0F0F0','BDBDBD','636363'],    
    4: ['F7F7F7','CCCCCC','969696','525252'],    
    5: ['F7F7F7','CCCCCC','969696','636363','252525'],    
    6: ['F7F7F7','D9D9D9','BDBDBD','969696','636363','252525'],    
    7: ['F7F7F7','D9D9D9','BDBDBD','969696','737373','525252','252525'],    
    8: ['FFFFFF','F0F0F0','D9D9D9','BDBDBD','969696','737373','525252','252525'],    
    9: ['FFFFFF','F0F0F0','D9D9D9','BDBDBD','969696','737373','525252','252525','000000']  
  },
  
  /**
   * @type Oranges sequential
   */  
  Oranges: {
    3: ['FEE6CE','FDAE6B','E6550D'],    
    4: ['FEEDDE','FDBE85','FD8D3C','D94701'],    
    5: ['FEEDDE','FDBE85','FD8D3C','E6550D','A63603'],    
    6: ['FEEDDE','FDD0A2','FDAE6B','FD8D3C','E6550D','A63603'],    
    7: ['FEEDDE','FDD0A2','FDAE6B','FD8D3C','F16913','D94801','8C2D04'],    
    8: ['FFF5EB','FEE6CE','FDD0A2','FDAE6B','FD8D3C','F16913','D94801','8C2D04'],    
    9: ['FFF5EB','FEE6CE','FDD0A2','FDAE6B','FD8D3C','F16913','D94801','A63603','7F2704']  
  },
  
  /**
   * @type Purples sequential
   */  
  Purples: {
    3: ['EFEDF5','BCBDDC','756BB1'],    
    4: ['F2F0F7','CBC9E2','9E9AC8','6A51A3'],    
    5: ['F2F0F7','CBC9E2','9E9AC8','756BB1','54278F'],    
    6: ['F2F0F7','DADAEB','BCBDDC','9E9AC8','756BB1','54278F'],    
    7: ['F2F0F7','DADAEB','BCBDDC','9E9AC8','807DBA','6A51A3','4A1486'],    
    8: ['FCFBFD','EFEDF5','DADAEB','BCBDDC','9E9AC8','807DBA','6A51A3','4A1486'],    
    9: ['FCFBFD','EFEDF5','DADAEB','BCBDDC','9E9AC8','807DBA','6A51A3','54278F','3F007D']  
  },
  
  /**
   * @type Reds sequential
   */  
  Reds: {
    3: ['FEE0D2','FC9272','DE2D26'],    
    4: ['FEE5D9','FCAE91','FB6A4A','CB181D'],    
    5: ['FEE5D9','FCAE91','FB6A4A','DE2D26','A50F15'],    
    6: ['FEE5D9','FCBBA1','FC9272','FB6A4A','DE2D26','A50F15'],    
    7: ['FEE5D9','FCBBA1','FC9272','FB6A4A','EF3B2C','CB181D','99000D'],    
    8: ['FFF5F0','FEE0D2','FCBBA1','FC9272','FB6A4A','EF3B2C','CB181D','99000D'],    
    9: ['FFF5F0','FEE0D2','FCBBA1','FC9272','FB6A4A','EF3B2C','CB181D','A50F15','67000D']  
  },
  
  /**
   * @type Brown-Blue-Green diverging
   */  
  BrBG: {
    3: ['D8B365','F5F5F5','5AB4AC'],    
    4: ['A6611A','DFC27D','80CDC1','018571'],    
    5: ['A6611A','DFC27D','F5F5F5','80CDC1','018571'],    
    6: ['8C510A','D8B365','F6E8C3','C7EAE5','5AB4AC','01665E'],    
    7: ['8C510A','D8B365','F6E8C3','F5F5F5','C7EAE5','5AB4AC','01665E'],    
    8: ['8C510A','BF812D','DFC27D','F6E8C3','C7EAE5','80CDC1','35978F','01665E'],    
    9: ['8C510A','BF812D','DFC27D','F6E8C3','F5F5F5','C7EAE5','80CDC1','35978F','01665E'],
   10: ['543005','8C510A','BF812D','DFC27D','F6E8C3','C7EAE5','80CDC1','35978F','01665E','003C30'],
   11: ['543005','8C510A','BF812D','DFC27D','F6E8C3','F5F5F5','C7EAE5','80CDC1','35978F','01665E','003C30']
  },
  
  /**
   * @type Pink-Yellow-Green diverging
   */  
  PiYG: {
    3: ['E9A3C9','F7F7F7','A1D76A'],    
    4: ['D01C8B','F1B6DA','B8E186','4DAC26'],    
    5: ['D01C8B','F1B6DA','F7F7F7','B8E186','4DAC26'],    
    6: ['C51B7D','E9A3C9','FDE0EF','E6F5D0','A1D76A','4D9221'],    
    7: ['C51B7D','E9A3C9','FDE0EF','F7F7F7','E6F5D0','A1D76A','4D9221'],    
    8: ['C51B7D','DE77AE','F1B6DA','FDE0EF','E6F5D0','B8E186','7FBC41','4D9221'],    
    9: ['C51B7D','DE77AE','F1B6DA','FDE0EF','F7F7F7','E6F5D0','B8E186','7FBC41','4D9221'],  
   10: ['8E0152','C51B7D','DE77AE','F1B6DA','FDE0EF','E6F5D0','B8E186','7FBC41','4D9221','276419'],  
   11: ['8E0152','C51B7D','DE77AE','F1B6DA','FDE0EF','F7F7F7','E6F5D0','B8E186','7FBC41','4D9221','276419']  
  },
  
  /**
   * @type Purple-Green diverging
   */  
  PRGn: {
    3: ['AF8DC3','F7F7F7','7FBF7B'],    
    4: ['7B3294','C2A5CF','A6DBA0','008837'],    
    5: ['7B3294','C2A5CF','F7F7F7','A6DBA0','008837'],    
    6: ['762A83','AF8DC3','E7D4E8','D9F0D3','7FBF7B','1B7837'],    
    7: ['762A83','AF8DC3','E7D4E8','F7F7F7','D9F0D3','7FBF7B','1B7837'],    
    8: ['762A83','9970AB','C2A5CF','E7D4E8','D9F0D3','A6DBA0','5AAE61','1B7837'],    
    9: ['762A83','9970AB','C2A5CF','E7D4E8','F7F7F7','D9F0D3','A6DBA0','5AAE61','1B7837'],  
   10: ['40004B','762A83','9970AB','C2A5CF','E7D4E8','D9F0D3','A6DBA0','5AAE61','1B7837','00441B'],    
   11: ['40004B','762A83','9970AB','C2A5CF','E7D4E8','F7F7F7','D9F0D3','A6DBA0','5AAE61','1B7837','00441B']  
  },
  
  /**
   * @type Purple-Orange diverging
   */  
  PuOr: {
    3: ['F1A340','F7F7F7','998EC3'],    
    4: ['E66101','FDB863','B2ABD2','5E3C99'],    
    5: ['E66101','FDB863','F7F7F7','B2ABD2','5E3C99'],    
    6: ['B35806','F1A340','FEE0B6','D8DAEB','998EC3','542788'],    
    7: ['B35806','F1A340','FEE0B6','F7F7F7','D8DAEB','998EC3','542788'],    
    8: ['B35806','E08214','FDB863','FEE0B6','D8DAEB','B2ABD2','8073AC','542788'],    
    9: ['B35806','E08214','FDB863','FEE0B6','F7F7F7','D8DAEB','B2ABD2','8073AC','542788'],  
   10: ['7F3B08','B35806','E08214','FDB863','FEE0B6','D8DAEB','B2ABD2','8073AC','542788','2D004B'],    
   11: ['7F3B08','B35806','E08214','FDB863','FEE0B6','F7F7F7','D8DAEB','B2ABD2','8073AC','542788','2D004B']  
  },
  
  /**
   * @type Red-Blue diverging
   */  
  RdBu: {
    3: ['EF8A62','F7F7F7','67A9CF'],    
    4: ['CA0020','F4A582','92C5DE','0571B0'],    
    5: ['CA0020','F4A582','F7F7F7','92C5DE','0571B0'],    
    6: ['B2182B','EF8A62','FDDBC7','D1E5F0','67A9CF','2166AC'],    
    7: ['B2182B','EF8A62','FDDBC7','F7F7F7','D1E5F0','67A9CF','2166AC'],    
    8: ['B2182B','D6604D','F4A582','FDDBC7','D1E5F0','92C5DE','4393C3','2166AC'],    
    9: ['B2182B','D6604D','F4A582','FDDBC7','F7F7F7','D1E5F0','92C5DE','4393C3','2166AC'],  
   10: ['67001F','B2182B','D6604D','F4A582','FDDBC7','D1E5F0','92C5DE','4393C3','2166AC','053061'],    
   11: ['67001F','B2182B','D6604D','F4A582','FDDBC7','F7F7F7','D1E5F0','92C5DE','4393C3','2166AC','053061']  
  },
  
  /**
   * @type Red-Grey diverging
   */  
  RdGy: {
    3: ['EF8A62','FFFFFF','999999'],    
    4: ['CA0020','F4A582','BABABA','404040'],    
    5: ['CA0020','F4A582','FFFFFF','BABABA','404040'],    
    6: ['B2182B','EF8A62','FDDBC7','E0E0E0','999999','4D4D4D'],    
    7: ['B2182B','EF8A62','FDDBC7','FFFFFF','E0E0E0','999999','4D4D4D'],    
    8: ['B2182B','D6604D','F4A582','FDDBC7','E0E0E0','BABABA','878787','4D4D4D'],    
    9: ['B2182B','D6604D','F4A582','FDDBC7','FFFFFF','E0E0E0','BABABA','878787','4D4D4D'],  
   10: ['67001F','B2182B','D6604D','F4A582','FDDBC7','E0E0E0','BABABA','878787','4D4D4D','1A1A1A'],    
   11: ['67001F','B2182B','D6604D','F4A582','FDDBC7','FFFFFF','E0E0E0','BABABA','878787','4D4D4D','1A1A1A']   
  },
  
  /**
   * @type Red-Yellow-Blue diverging
   */  
  RdYlBu: {
    3: ['FC8D59','FFFFBF','91BFDB'],    
    4: ['D7191C','FDAE61','ABD9E9','2C7BB6'],    
    5: ['D7191C','FDAE61','FFFFBF','ABD9E9','2C7BB6'],    
    6: ['D73027','FC8D59','FEE090','E0F3F8','91BFDB','4575B4'],    
    7: ['D73027','FC8D59','FEE090','FFFFBF','E0F3F8','91BFDB','4575B4'],    
    8: ['D73027','F46D43','FDAE61','FEE090','E0F3F8','ABD9E9','74ADD1','4575B4'],    
    9: ['D73027','F46D43','FDAE61','FEE090','FFFFBF','E0F3F8','ABD9E9','74ADD1','4575B4'],  
   10: ['A50026','D73027','F46D43','FDAE61','FEE090','E0F3F8','ABD9E9','74ADD1','4575B4','313695'],    
   11: ['A50026','D73027','F46D43','FDAE61','FEE090','FFFFBF','E0F3F8','ABD9E9','74ADD1','4575B4','313695']  
  },
  
  /**
   * @type Red-Yellow-Green diverging
   */  
  RdYlGn: {
    3: ['FC8D59','FFFFBF','91CF60'],    
    4: ['D7191C','FDAE61','A6D96A','1A9641'],    
    5: ['D7191C','FDAE61','FFFFBF','A6D96A','1A9641'],    
    6: ['D73027','FC8D59','FEE08B','D9EF8B','91CF60','1A9850'],    
    7: ['D73027','FC8D59','FEE08B','FFFFBF','D9EF8B','91CF60','1A9850'],    
    8: ['D73027','F46D43','FDAE61','FEE08B','D9EF8B','A6D96A','66BD63','1A9850'],    
    9: ['D73027','F46D43','FDAE61','FEE08B','FFFFBF','D9EF8B','A6D96A','66BD63','1A9850'],  
   10: ['A50026','D73027','F46D43','FDAE61','FEE08B','D9EF8B','A6D96A','66BD63','1A9850','006837'],    
   11: ['A50026','D73027','F46D43','FDAE61','FEE08B','FFFFBF','D9EF8B','A6D96A','66BD63','1A9850','006837']  
  },
  
  /**
   * @type Spectral diverging
   */  
  Spectral: {
    3: ['FC8D59','FFFFBF','99D594'],    
    4: ['D7191C','FDAE61','ABDDA4','2B83BA'],    
    5: ['D7191C','FDAE61','FFFFBF','ABDDA4','2B83BA'],    
    6: ['D53E4F','FC8D59','FEE08B','E6F598','99D594','3288BD'],    
    7: ['D53E4F','FC8D59','FEE08B','FFFFBF','E6F598','99D594','3288BD'],    
    8: ['D53E4F','F46D43','FDAE61','FEE08B','E6F598','ABDDA4','66C2A5','3288BD'],    
    9: ['D53E4F','F46D43','FDAE61','FEE08B','FFFFBF','E6F598','ABDDA4','66C2A5','3288BD'],  
   10: ['9E0142','D53E4F','F46D43','FDAE61','FEE08B','E6F598','ABDDA4','66C2A5','3288BD','5E4FA2'],    
   11: ['9E0142','D53E4F','F46D43','FDAE61','FEE08B','FFFFBF','E6F598','ABDDA4','66C2A5','3288BD','5E4FA2']  
  },
  
  /**
   * @type Accent qualitative
   */  
  Accent: {
    3: ['7FC97F','BEAED4','FDC086'],    
    4: ['7FC97F','BEAED4','FDC086','FFFF99'],    
    5: ['7FC97F','BEAED4','FDC086','FFFF99','386CB0'],    
    6: ['7FC97F','BEAED4','FDC086','FFFF99','386CB0','F0027F'],    
    7: ['7FC97F','BEAED4','FDC086','FFFF99','386CB0','F0027F','BF5B17'],    
    8: ['7FC97F','BEAED4','FDC086','FFFF99','386CB0','F0027F','BF5B17','666666']
  },
  
  /**
   * @type Dark 2 qualitative
   */  
  Dark2: {
    3: ['1B9E77','D95F02','7570B3'],    
    4: ['1B9E77','D95F02','7570B3','E7298A'],    
    5: ['1B9E77','D95F02','7570B3','E7298A','66A61E'],    
    6: ['1B9E77','D95F02','7570B3','E7298A','66A61E','E6AB02'],    
    7: ['1B9E77','D95F02','7570B3','E7298A','66A61E','E6AB02','A6761D'],    
    8: ['1B9E77','D95F02','7570B3','E7298A','66A61E','E6AB02','A6761D','666666']
  },
  
  /**
   * @type Paired qualitative
   */  
  Paired: {
    3: ['A6CEE3','1F78B4','B2DF8A'],    
    4: ['A6CEE3','1F78B4','B2DF8A','33A02C'],    
    5: ['A6CEE3','1F78B4','B2DF8A','33A02C','FB9A99'],    
    6: ['A6CEE3','1F78B4','B2DF8A','33A02C','FB9A99','E31A1C'],    
    7: ['A6CEE3','1F78B4','B2DF8A','33A02C','FB9A99','E31A1C','FDBF6F'],    
    8: ['A6CEE3','1F78B4','B2DF8A','33A02C','FB9A99','E31A1C','FDBF6F','FF7F00'],    
    9: ['A6CEE3','1F78B4','B2DF8A','33A02C','FB9A99','E31A1C','FDBF6F','FF7F00','CAB2D6'],  
   10: ['A6CEE3','1F78B4','B2DF8A','33A02C','FB9A99','E31A1C','FDBF6F','FF7F00','CAB2D6','6A3D9A'],    
   11: ['A6CEE3','1F78B4','B2DF8A','33A02C','FB9A99','E31A1C','FDBF6F','FF7F00','CAB2D6','6A3D9A','FFFF99']  
  },
  
  /**
   * @type Pastel 1 qualitative
   */  
  Pastel1: {
    3: ['FBB4AE','B3CDE3','CCEBC5'],    
    4: ['FBB4AE','B3CDE3','CCEBC5','DECBE4'],    
    5: ['FBB4AE','B3CDE3','CCEBC5','DECBE4','FED9A6'],    
    6: ['FBB4AE','B3CDE3','CCEBC5','DECBE4','FED9A6','FFFFCC'],    
    7: ['FBB4AE','B3CDE3','CCEBC5','DECBE4','FED9A6','FFFFCC','E5D8BD'],    
    8: ['FBB4AE','B3CDE3','CCEBC5','DECBE4','FED9A6','FFFFCC','E5D8BD','FDDAEC'],    
    9: ['FBB4AE','B3CDE3','CCEBC5','DECBE4','FED9A6','FFFFCC','E5D8BD','FDDAEC','F2F2F2']
  },
  
  /**
   * @type Pastel 2 qualitative
   */  
  Pastel2: {
    3: ['B3E2CD','FDCDAC','CBD5E8'],    
    4: ['B3E2CD','FDCDAC','CBD5E8','F4CAE4'],    
    5: ['B3E2CD','FDCDAC','CBD5E8','F4CAE4','E6F5C9'],    
    6: ['B3E2CD','FDCDAC','CBD5E8','F4CAE4','E6F5C9','FFF2AE'],    
    7: ['B3E2CD','FDCDAC','CBD5E8','F4CAE4','E6F5C9','FFF2AE','F1E2CC'],    
    8: ['B3E2CD','FDCDAC','CBD5E8','F4CAE4','E6F5C9','FFF2AE','F1E2CC','CCCCCC']
  },
  
  /**
   * @type Set 1 qualitative
   */  
  Set1: {
    3: ['E41A1C','377EB8','4DAF4A'],    
    4: ['E41A1C','377EB8','4DAF4A','984EA3'],    
    5: ['E41A1C','377EB8','4DAF4A','984EA3','FF7F00'],    
    6: ['E41A1C','377EB8','4DAF4A','984EA3','FF7F00','FFFF33'],    
    7: ['E41A1C','377EB8','4DAF4A','984EA3','FF7F00','FFFF33','A65628'],    
    8: ['E41A1C','377EB8','4DAF4A','984EA3','FF7F00','FFFF33','A65628','F781BF'],    
    9: ['E41A1C','377EB8','4DAF4A','984EA3','FF7F00','FFFF33','A65628','F781BF','999999']
  },
  
  /**
   * @type Set 2 qualitative
   */  
  Set2: {
    3: ['66C2A5','FC8D62','8DA0CB'],    
    4: ['66C2A5','FC8D62','8DA0CB','E78AC3'],    
    5: ['66C2A5','FC8D62','8DA0CB','E78AC3','A6D854'],    
    6: ['66C2A5','FC8D62','8DA0CB','E78AC3','A6D854','FFD92F'],    
    7: ['66C2A5','FC8D62','8DA0CB','E78AC3','A6D854','FFD92F','E5C494'],    
    8: ['66C2A5','FC8D62','8DA0CB','E78AC3','A6D854','FFD92F','E5C494','B3B3B3']
  },
  
  /**
   * @type Set 3 qualitative
   */  
  Set3: {
    3: ['8DD3C7','FFFFB3','BEBADA'],    
    4: ['8DD3C7','FFFFB3','BEBADA','FB8072'],    
    5: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3'],    
    6: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3','FDB462'],    
    7: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3','FDB462','B3DE69'],    
    8: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3','FDB462','B3DE69','FCCDE5'],    
    9: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3','FDB462','B3DE69','FCCDE5','D9D9D9'],  
   10: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3','FDB462','B3DE69','FCCDE5','D9D9D9','BC80BD'],    
   11: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3','FDB462','B3DE69','FCCDE5','D9D9D9','BC80BD','CCEBC5'],
   12: ['8DD3C7','FFFFB3','BEBADA','FB8072','80B1D3','FDB462','B3DE69','FCCDE5','D9D9D9','BC80BD','CCEBC5','FFED6F']  
  }
       
};
    