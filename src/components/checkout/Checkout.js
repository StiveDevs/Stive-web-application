import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import AddressForm from "./AddressForm";
import Review from "./Review";
import { Dialog } from "@mui/material";

const steps = ["Create The Post", "Review The Post"];

function getStepContent(step) {
	switch (step) {
		case 0:
			return <AddressForm />;
		case 1:
			return <Review />;
		default:
			throw new Error("Unknown step");
	}
}

export default function Checkout({ showCreatePost, setShowCreatePost }) {
	const [activeStep, setActiveStep] = React.useState(0);

	const handleNext = () => {
		setActiveStep(activeStep + 1);
	};

	const handleBack = () => {
		setActiveStep(activeStep - 1);
	};

	return (
		<Dialog open={showCreatePost} onClose={() => setShowCreatePost(false)}>
			<Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
				<Paper
					variant="outlined"
					sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}
				>
					<Typography component="h1" variant="h4" align="center">
						Create Post
					</Typography>
					<Stepper activeStep={activeStep} sx={{ pt: 3, pb: 5 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>
					<React.Fragment>
						{activeStep === steps.length ? (
							<React.Fragment>
								<Typography
									align="center"
									variant="h5"
									gutterBottom
								>
									Post Created Successfully
								</Typography>
								<Typography align="center" variant="subtitle1">
									To view your post go to the homepage of your
									Club
								</Typography>
							</React.Fragment>
						) : (
							<React.Fragment>
								{getStepContent(activeStep)}
								<Box
									sx={{
										display: "flex",
										justifyContent: "flex-end",
									}}
								>
									{activeStep !== 0 && (
										<Button
											onClick={handleBack}
											sx={{ mt: 3, ml: 1 }}
										>
											Back
										</Button>
									)}

									<Button
										variant="contained"
										onClick={handleNext}
										sx={{ mt: 3, ml: 1 }}
									>
										{activeStep === steps.length - 1
											? "Submit"
											: "Next"}
									</Button>
								</Box>
							</React.Fragment>
						)}
					</React.Fragment>
				</Paper>
			</Container>
		</Dialog>
	);
}
