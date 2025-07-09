import React from 'react';
import { Typography, Link, List, ListItem, Divider, Container, Box } from '@mui/material';
import { ReactNode } from 'react';
import BlankLayout from 'src/@core/layouts/BlankLayout';

const PrivacyPolicy = () => {
  return (
    <Container >
     
        <h2>Privacy Policy</h2>
        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
          Last updated: May 27, 2025
        </Typography>
        <Typography paragraph>
          This Privacy Policy describes Our policies and procedures on the collection, use and disclosure 
          of Your information when You use the Service and tells You about Your privacy rights and how 
          the law protects You.
        </Typography>
        <Typography paragraph>
          We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection 
          and use of information in accordance with this Privacy Policy. This Privacy Policy has been created with the help 
          of the Privacy Policy Generator.
        </Typography>
        <h2>Interpretation and Definitions</h2>
        
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
          Interpretation
        </Typography>
        <Typography paragraph>
          The words of which the initial letter is capitalized have meanings defined under the following 
          conditions. The following definitions shall have the same meaning regardless of whether they 
          appear in singular or in plural.
        </Typography>
        
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
          Definitions
        </Typography>
        <Typography paragraph>
          For the purposes of this Privacy Policy:
        </Typography>
        <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Account</Box> means a unique account created for You to access our Service or parts of our Service.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Affiliate</Box> means an entity that controls, is controlled by or is under common control with a party, where "control" means ownership of 50% or more of the shares, equity interest or other securities entitled to vote for election of directors or other managing authority.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Application</Box> refers to Dialogue, the software program provided by the Company.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Company</Box> (referred to as either "the Company", "We", "Us" or "Our" in this Agreement) refers to Australian Islamic College Perth Inc, 139 PRESIDENT ST KEWDALE 6105.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Country</Box> refers to: Western Australia, Australia.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Device</Box> means any device that can access the Service such as a computer, a cellphone or a digital tablet.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Personal Data</Box> is any information that relates to an identified or identifiable individual.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Service</Box> refers to the Application.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Service Provider</Box> means any natural or legal person who processes the data on behalf of the Company.
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">Usage Data</Box> refers to data collected automatically, either generated by the use of the Service or from the Service infrastructure itself (for example, the duration of a page visit).
            </Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
              <Box component="span" fontWeight="bold">You</Box> means the individual accessing or using the Service, or the company, or other legal entity on behalf of which such individual is accessing or using the Service, as applicable.
            </Typography>
          </ListItem>
        </List>

        <h2>Collecting and Using Your Personal Data</h2>
        
        <h4>Personal Data</h4>
        
        <Typography paragraph>
          While using Our Service, We may ask You to provide Us with certain personally identifiable 
          information that can be used to contact or identify You.
        </Typography>
        <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Email address</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">First name and last name</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Phone number</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Usage Data</Typography>
          </ListItem>
        </List>
        
        <h4>Usage Data</h4>
        <Typography paragraph>
          Usage Data is collected automatically when using the Service.
        </Typography>
        <Typography paragraph>
            Usage Data may include information such as Your Device's Internet Protocol address (e.g. IP address), 
            browser type, browser version, the pages of our Service that You visit, the time and date of Your visit, the time spent on 
            those pages, unique device identifiers and other diagnostic data.
        </Typography>
        <Typography paragraph>
            When You access the Service by or through a mobile device, We may collect certain information automatically, including, but not limited to, the type of mobile device You use, Your mobile device unique ID, the IP address of Your mobile device, Your mobile operating system, the type of mobile Internet browser You use, unique device identifiers and other diagnostic data.
        </Typography>
        <Typography paragraph>
            We may also collect information that Your browser sends whenever You visit our Service or when You access the Service by or through a mobile device.
        </Typography>
        
        
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
        Use of Your Personal Data
        </Typography>
        <Typography paragraph>
        The Company may use Personal Data for the following purposes:
        </Typography>
        <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">To provide and maintain our Service:</Box> including to monitor the usage of our Service.
            </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">To manage Your Account:</Box> to manage Your registration as a user of the Service. The Personal Data You provide can give You access to different functionalities of the Service that are available to You as a registered user.
            </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">For the performance of a contract:</Box> the development, compliance and undertaking of the purchase contract for the products, items or services You have purchased or of any other contract with Us through the Service.
            </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">To contact You:</Box> To contact You by email, telephone calls, SMS, or other equivalent forms of electronic communication, such as a mobile application's push notifications regarding updates or informative communications related to the functionalities, products or contracted services, including the security updates, when necessary or reasonable for their implementation.
            </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">To provide You with news, special offers and general information:</Box> about other goods, services and events which we offer that are similar to those that you have already purchased or enquired about unless You have opted not to receive such information.
            </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">To manage Your requests:</Box> To attend and manage Your requests to Us.
            </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">For business transfers:</Box> We may use Your information to evaluate or conduct a merger, divestiture, restructuring, reorganization, dissolution, or other sale or transfer of some or all of Our assets, whether as a going concern or as part of bankruptcy, liquidation, or similar proceeding, in which Personal Data held by Us about our Service users is among the assets transferred.
            </Typography>
        </ListItem>
        <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">
            <Box component="span" fontWeight="bold">For other purposes:</Box> We may use Your information for other purposes, such as data analysis, identifying usage trends, determining the effectiveness of our promotional campaigns and to evaluate and improve our Service, products, services, marketing and your experience.
            </Typography>
        </ListItem>
        </List>

<Typography paragraph sx={{ mt: 2 }}>
  We may share Your personal information in the following situations:
</Typography>
<List dense sx={{ listStyleType: 'disc', pl: 4 }}>
  <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
    <Typography component="span">
      <Box component="span" fontWeight="bold">With Service Providers:</Box> We may share Your personal information with Service Providers to monitor and analyze the use of our Service, to contact You.
    </Typography>
  </ListItem>
  <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
    <Typography component="span">
      <Box component="span" fontWeight="bold">For business transfers:</Box> We may share or transfer Your personal information in connection with, or during negotiations of, any merger, sale of Company assets, financing, or acquisition of all or a portion of Our business to another company.
    </Typography>
  </ListItem>
  <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
    <Typography component="span">
      <Box component="span" fontWeight="bold">With Affiliates:</Box> We may share Your information with Our affiliates, in which case we will require those affiliates to honor this Privacy Policy. Affiliates include Our parent company and any other subsidiaries, joint venture partners or other companies that We control or that are under common control with Us.
    </Typography>
  </ListItem>
  <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
    <Typography component="span">
      <Box component="span" fontWeight="bold">With business partners:</Box> We may share Your information with Our business partners to offer You certain products, services or promotions.
    </Typography>
  </ListItem>
  <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
    <Typography component="span">
      <Box component="span" fontWeight="bold">With other users:</Box> when You share personal information or otherwise interact in the public areas with other users, such information may be viewed by all users and may be publicly distributed outside.
    </Typography>
  </ListItem>
  <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
    <Typography component="span">
      <Box component="span" fontWeight="bold">With Your consent:</Box> We may disclose Your personal information for any other purpose with Your consent.
    </Typography>
  </ListItem>
</List>

        {/* Retention of Data */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
        Retention of Your Personal Data
        </Typography>
        <Typography paragraph>
          The Company will retain Your Personal Data only for as long as is necessary for the purposes 
          set out in this Privacy Policy. We will retain and use Your Personal Data to the extent 
          necessary to comply with our legal obligations, resolve disputes, and enforce our legal 
          agreements and policies.
          </Typography>
          <Typography paragraph>
            The Company will also retain Usage Data for internal analysis purposes. Usage Data is generally 
          retained for a shorter period of time, except when this data is used to strengthen the security or to 
          improve the functionality of Our Service, or We are legally obligated to retain this data for longer time periods.
          </Typography>
        

        {/* Transfer of Data */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
        Transfer of Your Personal Data
        </Typography>
        <Typography paragraph>
          Your information, including Personal Data, may be transferred to — and maintained on — computers 
          located outside of Your jurisdiction where data protection laws may differ. Your consent to this 
          Privacy Policy represents Your agreement to that transfer.
        </Typography>
        <Typography paragraph>
          The Company will take all steps reasonably necessary to ensure that Your data is treated securely 
          and in accordance with this Privacy Policy and no transfer of Your Personal Data will take place 
          to an organization or a country unless there are adequate controls in place including the security 
          of Your data and other personal information.
        </Typography>

        {/* Delete Your Personal Data */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
        Delete Your Personal Data
        </Typography>
        <Typography paragraph>
          You have the right to delete or request that We assist in deleting the Personal Data that We have 
          collected about You.
        </Typography>
        <Typography paragraph>
          Our Service may give You the ability to delete certain information about You from within the Service.
        </Typography>
        <Typography paragraph>
          You may update, amend, or delete Your information at any time by signing in to Your Account, if you 
          have one, and visiting the account settings section that allows you to manage Your personal information. 
          You may also contact Us to request access to, correct, or delete any personal information that You have 
          provided to Us.
        </Typography>
        <Typography paragraph>
          Please note, however, that We may need to retain certain information when we have a legal obligation 
          or lawful basis to do so.
        </Typography>

        {/* Disclosure of Your Personal Data */}
        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
        Disclosure of Your Personal Data
        </Typography>
        
        <h4>Business Transactions</h4>
        <Typography paragraph>
          If the Company is involved in a merger, acquisition or asset sale, Your Personal Data may be transferred. 
          We will provide notice before Your Personal Data is transferred and becomes subject to a different Privacy Policy.
        </Typography>
        
        <h4>Law Enforcement</h4>
        <Typography paragraph>
          Under certain circumstances, the Company may be required to disclose Your Personal Data if required to do so 
          by law or in response to valid requests by public authorities (e.g. a court or a government agency).
        </Typography>
        
        <h4>Other Legal Requirements</h4>
        <Typography paragraph>
          The Company may disclose Your Personal Data in the good faith belief that such action is necessary to:
        </Typography>
        <List dense sx={{ listStyleType: 'disc', pl: 4 }}>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Comply with a legal obligation</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Protect and defend the rights or property of the Company</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Prevent or investigate possible wrongdoing in connection with the Service</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Protect the personal safety of Users of the Service or the public</Typography>
          </ListItem>
          <ListItem sx={{ display: 'list-item', py: 0.5, pl: 1 }}>
            <Typography component="span">Protect against legal liability</Typography>
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 2 }}>
        Security of Your Personal Data
        </Typography>
        <Typography paragraph>
          The security of Your Personal Data is important to Us, but remember that no method of transmission over 
          the Internet, or method of electronic storage is 100% secure. While We strive to use commercially acceptable 
          means to protect Your Personal Data, We cannot guarantee its absolute security.
        </Typography>

        <h2>Children's Privacy</h2>
        <Typography paragraph>
          Our Service does not address anyone under the age of 13. We do not knowingly collect personally identifiable 
          information from anyone under the age of 13. If You are a parent or guardian and You are aware that Your child 
          has provided Us with Personal Data, please contact Us. If We become aware that We have collected Personal Data 
          from anyone under the age of 13 without verification of parental consent, We take steps to remove that information 
          from Our servers.
        </Typography>
        <Typography paragraph>
          If We need to rely on consent as a legal basis for processing Your information and Your country requires consent 
          from a parent, We may require Your parent's consent before We collect and use that information.
        </Typography>

        <h2>Links to Other Websites</h2>
        <Typography paragraph>
          Our Service may contain links to other websites that are not operated by Us. If You click on a third party link, 
          You will be directed to that third party's site. We strongly advise You to review the Privacy Policy of every site 
          You visit.
        </Typography>
        <Typography paragraph>
          We have no control over and assume no responsibility for the content, privacy policies or practices of any third 
          party sites or services.
        </Typography>

        <h2>Changes to this Privacy Policy</h2>
        <Typography paragraph>
          We may update Our Privacy Policy from time to time. We will notify You of any changes by posting the new Privacy 
          Policy on this page.
        </Typography>
        <Typography paragraph>
          We will let You know via email and/or a prominent notice on Our Service, prior to the change becoming effective 
          and update the "Last updated" date at the top of this Privacy Policy.
        </Typography>
        <Typography paragraph>
          You are advised to review this Privacy Policy periodically for any changes. Changes to this Privacy Policy are 
          effective when they are posted on this page.
        </Typography>

        {/* Contact Us */}
        <h2>Contact Us</h2>
        <Typography paragraph>
          If you have any questions about this Privacy Policy, You can contact us:
        </Typography>
        <List dense>
          <ListItem>
            <Typography>
              By email: <Link href="mailto:helpdesk@aic.wa.edu.au">helpdesk@aic.wa.edu.au</Link>
            </Typography>
          </ListItem>
        </List>

        <Divider sx={{ my: 3 }} />
        <Typography variant="body2" color="text.secondary" align="center">
          © {new Date().getFullYear()} Australian Islamic College Perth Inc. All rights reserved.
        </Typography>

    </Container>
  );
};

PrivacyPolicy.getLayout = (page: ReactNode) => <BlankLayout>{page}</BlankLayout>;
export default PrivacyPolicy;